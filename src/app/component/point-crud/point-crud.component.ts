import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Timecard } from 'src/app/interfaces/timecard';
import { SharePointService } from 'src/app/services/shared/share-point.service';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const FORMAT = "yyyy-MM-ddThh:mm";
@Component({
  selector: 'app-point-crud',
  templateUrl: './point-crud.component.html',
  styleUrls: ['./point-crud.component.scss']
})
export class PointCrudComponent implements AfterViewInit, OnInit {

  data: any = formatDate(new Date(), FORMAT, "pt-BR");
  cardpoint!: Timecard;
  pointgroup!: FormGroup
  selectDate: string = ""
  selectEntrada: string = ""
  selectSaida: string = ""

  constructor (
    private shared: SharePointService,
    private cdref: ChangeDetectorRef,
    private toastr:ToastrService) { }

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
