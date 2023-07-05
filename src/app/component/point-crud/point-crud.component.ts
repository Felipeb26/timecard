import { formatDate } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Timecard } from 'src/app/interfaces/timecard';
import { BatsworksApiService } from 'src/app/services/batsworks-api.service';
import { LoginService } from 'src/app/services/login.service';
import { SharePointService } from 'src/app/services/shared/share-point.service';
import { UtilsService } from 'src/app/services/utils.service';

const FORMAT = "yyyy-MM-ddThh:mm";
@Component({
  selector: 'app-point-crud',
  templateUrl: './point-crud.component.html',
  styleUrls: ['./point-crud.component.scss']
})
export class PointCrudComponent implements AfterViewInit, OnInit {

  cardpoint_clean!: Timecard;
  cardpoint!: Timecard;

  dataCadastro: string = ""; dataEntrada: string = ""; dataSaida: string = "";

  placeholder_1: string = "Data cadastrada";
  placeholder_2: string = "Data entrada";
  placeholder_3: string = "Data saida";
  // itens default
  minnimuData: any = formatDate(new Date(), FORMAT, "pt-BR");
  horas_dia: number[] = [4, 6, 8, 10, 12]
  horas_almoco: number[] = [15, 30, 1, 2]
  pointgroup!: FormGroup;
  btnSaveDisabled: boolean = true;
  error: boolean = false;

  constructor (
    private requests: BatsworksApiService,
    private shared: SharePointService,
    private cdref: ChangeDetectorRef,
    private toastr: ToastrService,
    private cookie: CookieService,
    private token: LoginService,
    private utils: UtilsService) { }

  ngOnInit(): void {
    const data = new Date();
    data.setHours(0, 0, 0);
    this.minnimuData = formatDate(data, FORMAT, "pt-BR");

    this.pointgroup = new FormGroup({
      horasAlmoco: new FormControl(""),
      jornadaTrabalho: new FormControl("")
    });
  }

  ngAfterViewInit(): void {
    this.cdref.detectChanges();
    this.shared.value.subscribe((timecard: Timecard) => {
      this.cardpoint = timecard;
      this.placeholder_1 = timecard.dataCadastro;
      this.placeholder_2 = timecard.dataEntrada;
      this.placeholder_3 = timecard.dataSaida;

      this.pointgroup = new FormGroup({
        horasAlmoco: new FormControl(Number(timecard.tempoAlmoco.split(" ")[0])),
        jornadaTrabalho: new FormControl(timecard.jornadaTrabalho)
      });
    });
  }

  resetFullForm() {
    this.cardpoint = this.cardpoint_clean;
    this.pointgroup = new FormGroup({
      horasAlmoco: new FormControl(""),
      jornadaTrabalho: new FormControl("")
    });
    this.placeholder_1 = "Data cadastrada";
    this.placeholder_2 = "Data entrada";
    this.placeholder_3 = "Data saida";
    this.error = false;
  }

  getDataCadastro($event: string): void {
    const [data, horario] = $event.split(" ");
    const [dia, mes, ano] = data.split("/")
    this.dataCadastro = `${ano}-${mes}-${dia} ${horario}`;
  }

  getDataEntrada($event: string): void {
    const [data, horario] = $event.split(" ");
    const [dia, mes, ano] = data.split("/")
    this.dataEntrada = `${ano}-${mes}-${dia} ${horario}`;
  }

  getDataSaida($event: string): void {
    const [data, horario] = $event.split(" ");
    const [dia, mes, ano] = data.split("/")
    this.dataSaida = `${ano}-${mes}-${dia} ${horario}`;
  }

  markPointcard(form: FormGroupDirective) {
    const { sub } = this.token.decodeToken(this.cookie.get("auth"));
    if (form.invalid) {
      this.error = true; return;
    }
    const { horasAlmoco, jornadaTrabalho } = form.value;

    console.log(form.value)
    const cardpoint: Timecard = {
      dataCadastro: this.dataCadastro,
      dataEntrada: this.dataEntrada,
      dataSaida: this.dataSaida,
      jornadaTrabalho: jornadaTrabalho,
      tempoAlmoco: horasAlmoco > 10 ? horasAlmoco + " mins" : horasAlmoco + " hrs",
      personaDTO: {
        username: "",
        nome: "",
        email: sub,
        idade: "",
        senha: "",
        dataNascimento: ""
      }
    }
    this.requests.postTimeCard(cardpoint).subscribe(
      (data) => {
        console.log(data)
        this.toastr.success(`criado ponto`);
        window.location.reload();
      },
      (error) => {
        this.toastr.error(`${error.message}`);
        console.log(error)
      });
    this.shared.needsUpdate(true);
  }

  setHorasTrabalhadas(data_1: string, data_2: string): string {
    const [data1, horario1] = data_1.split(" ");
    const [ano1, mes1, dia1] = data1.split("-");
    const [hora1, min1] = horario1.split(":")

    const [data2, horario2] = data_2.split(" ");
    const [ano2, mes2, dia2] = data2.split("-");
    const [hora2, min2] = horario2.split(":")

    const date1 = new Date(Number(ano1), Number(mes1), Number(dia1), Number(hora1), Number(min1));
    const date2 = new Date(Number(ano2), Number(mes2), Number(dia2), Number(hora2), Number(min2));

    const diferencaEmMilissegundos: number = date2.getTime() - date1.getTime();
    console.log(diferencaEmMilissegundos)

    return diferencaEmMilissegundos + "";
  }

}
