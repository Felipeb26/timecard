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
  cardpoint!: Timecard;
  pointgroup!: FormGroup;
  // propriedades para se alterar
  horas: string = "";
  hora_dia: number = 0;
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
    this.shared.value.subscribe((timecard: Timecard) => {
      this.cardpoint = timecard;
      this.cdref.detectChanges();
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
    this.setSaldoHoras()
  }

  setHorasTrabalhadas() {
    if (this.selectEntrada.length <= 0 || this.selectSaida.length <= 0) return;
    const entrada = new Date(this.selectEntrada).getTime();
    const saida = new Date(this.selectSaida).getTime();
    this.horas = this.utils.millisToTime(saida - entrada);
  }

  setSaldoHoras() {
    if (this.horas.length <= 0 || this.hora_dia <= 0) return;
    const horas = this.horas.replaceAll(/\D/g, "");
    this.saldo = this.utils.minusDate(horas, this.hora_dia);
    if (this.selectDate.length <= 0) return;
    this.btnSaveDisabled = false;
  }

  resetFullForm() {
    this.cardpoint = { data: "", entrada: "", horas_trabalhadas: "", saida: "", saldo: 0 };
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
      horas_trabalhadas: this.horas,
      saldo: Number(this.saldo)
    }
    this.requests.post(cardpoint).subscribe(
      (data) => this.toastr.success(`criado ponto`),
      (error) => this.toastr.error(`Houve um erro ${error}`)
    )
  }


}
