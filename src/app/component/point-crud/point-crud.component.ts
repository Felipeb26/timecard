import { formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { dA } from '@fullcalendar/core/internal-common';
import { ToastrService } from 'ngx-toastr';
import { Timecard } from 'src/app/interfaces/timecard';
import { RequestsService } from 'src/app/services/requests.service';
import { SharePointService } from 'src/app/services/shared/share-point.service';
import { UtilsService } from 'src/app/services/utils.service';

const FORMAT = "yyyy-MM-ddThh:mm";
@Component({
  selector: 'app-point-crud',
  templateUrl: './point-crud.component.html',
  styleUrls: ['./point-crud.component.scss']
})
export class PointCrudComponent implements AfterViewInit, OnInit {
  // itens default
  data: any = formatDate(new Date(), FORMAT, "pt-BR");
  horas_dia: number[] = [4, 6, 8, 10, 12]
  almoco: number[] = [15, 30, 1, 2]
  cardpoint_clean!: Timecard;
  cardpoint!: Timecard;
  pointgroup!: FormGroup;
  // propriedades para se alterar
  horas: string = "";
  hora_dia: number = 0;
  hora_almoco: number = 0;
  saldo: string | number = "";
  btnSaveDisabled: boolean = true;
  // datas selecionadas
  selectDate: string = "";
  selectEntrada: string = "";
  selectSaida: string = "";


  constructor (
    private requests: RequestsService,
    private shared: SharePointService,
    private cdref: ChangeDetectorRef,
    private toastr: ToastrService,
    private utils: UtilsService) { }

  ngOnInit(): void {
    this.pointgroup = new FormGroup({
      data: new FormControl(""),
      entrada: new FormControl(""),
      saida: new FormControl("")
    });
  }

  ngAfterViewInit(): void {
    this.cdref.detectChanges();
    this.shared.value.subscribe((timecard: Timecard) => {
      this.cardpoint = timecard;
    });
  }

  showDate(event: any) {
    this.selectDate = event
    this.setHorasTrabalhadas()
    this.setSaldoHoras();
  }

  getEntrada(event: any) {
    this.selectEntrada = event
    this.setHorasTrabalhadas()
    this.setSaldoHoras();
  }
  getSaida(event: any) {
    this.selectSaida = event;
    this.setHorasTrabalhadas()
    this.setSaldoHoras();
  }

  setHorasDia(event: number) {
    this.hora_dia = event;
    this.setHorasTrabalhadas()
    this.setSaldoHoras()
  }
  setTempoAlmoco(event: number) {
    this.hora_almoco = event;
    this.setSaldoHoras()
    this.setHorasTrabalhadas()
  }

  setHorasTrabalhadas() {
    if (this.selectEntrada.length <= 0 || this.selectSaida.length <= 0) return;
    const entrada = new Date(this.selectEntrada).getTime();
    const saida = new Date(this.selectSaida).getTime();
    const { hours, minutes } = this.utils.millisToTime(saida - entrada);

    const tempo_almoco = this.utils.valueOrZero(this.hora_almoco);
    const positiveHour = this.utils.isPositive(hours);

    if (tempo_almoco > 10) {
      this.horas = `${positiveHour ? hours - 1 : hours + 1} horas e ${minutes == 0 ? 60 - tempo_almoco : minutes - tempo_almoco}`
    }

    if (tempo_almoco < 10) {
      this.horas = `${hours - tempo_almoco} Horas e ${minutes} minutos `;
    }
  }

  setSaldoHoras() {
    if (this.selectEntrada.length <= 0 || this.selectSaida.length <= 0) return;
    if (this.horas.length <= 0 || this.hora_dia <= 0) return;

    const horas_trabalhadas = this.utils.valueOrZero(this.hora_dia);

    const jornada_trabalho = new Date();
    jornada_trabalho.setHours(horas_trabalhadas, 0, 0)

    const horario = this.horas.replaceAll(/\D/g, "").split("");
    const { hora, minuto } = this.utils.toHourObject(horario);
    const horario_trabalhado = new Date();

    horario_trabalhado.setHours(Number(hora), Number(minuto), 0);
    const { hours, minutes } = this.utils.millisToTime(horario_trabalhado.getTime() - jornada_trabalho.getTime());

    this.saldo = `${hours}.${minutes < 10 ? "0" + minutes : minutes}`
    if (this.selectDate.length <= 0) return;
    this.btnSaveDisabled = false;
  }

  resetFullForm() {
    this.cardpoint = this.cardpoint_clean;
    this.pointgroup = new FormGroup({
      data: new FormControl(""),
      entrada: new FormControl(""),
      saida: new FormControl(""),
      horas_dia: new FormControl("")
    });
    this.saldo = "";
    this.horas = "";
  }

  markPointcard() {
    const { data, entrada, saida } = this.pointgroup.controls;
    const cardpoint: Timecard = {
      data: data.value,
      entrada: entrada.value,
      saida: saida.value,
      horas_trabalhadas: this.horas.trim(),
      saldo: Number(this.saldo)
    }
    this.requests.post(cardpoint).subscribe(
      (data) => {
        this.toastr.success(`criado ponto`);
        window.location.reload();
      },
      (error) => this.toastr.error(`Houve um erro ${error.message}`)
    );
    this.shared.needsUpdate(true);
  }

}
