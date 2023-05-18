import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Timecard } from 'src/app/interfaces/timecard';
import { SharePointService } from 'src/app/services/shared/share-point.service';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/app/services/utils.service';

const FORMAT = "yyyy-MM-ddThh:mm";
@Component({
  selector: 'app-point-crud',
  templateUrl: './point-crud.component.html',
  styleUrls: ['./point-crud.component.scss']
})
export class PointCrudComponent implements AfterViewInit, OnInit {

  data: any = formatDate(new Date(), FORMAT, "pt-BR");
  cardpoint!: Timecard;
  pointgroup!: FormGroup;
  selectDate: string = "";
  selectEntrada: string = "";
  selectSaida: string = "";
  horas: string | number = "";
  saldo: string | number = ""

  constructor (
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
    console.log(event)
  }

  getEntrada(event: any) {
    this.selectEntrada = event
    console.log(event)
    this.setHorasTrabalhadas()
  }
  getSaida(event: any) {
    this.selectSaida = event;
    console.log(event)
    this.setHorasTrabalhadas()
  }

  setHorasTrabalhadas() {
    if (this.selectEntrada.length <= 0 || this.selectSaida.length <= 0) return;
    const entrada = new Date(this.selectEntrada).getTime();
    const saida = new Date(this.selectSaida).getTime();
    this.horas = this.utils.millisToTime(saida - entrada);
  }

  setSaldoHoras() {
    const entrada = new Date(this.selectEntrada).getTime();
    const saida = new Date(this.selectSaida).getTime();
    this.saldo = this.utils.millisToTime(entrada - saida);
  }


  resetFullForm() {
    // this.toastr.info("",{
    // })
  }

  markPointcard() {
    const { data, entrada, saida } = this.pointgroup.controls;
    this.toastr.success("kjvfh")
  }


}
