import { ChangeDetectorRef, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExportType, MatTableExporterDirective } from 'mat-table-exporter';
import { ToastrService } from 'ngx-toastr';
import { Timecard } from 'src/app/interfaces/timecard';
import { BatsworksApiService } from 'src/app/services/batsworks-api.service';
import { SharePointService } from 'src/app/services/shared/share-point.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-point-table',
  templateUrl: './point-table.component.html',
  styleUrls: ['./point-table.component.scss']
})
export class PointTableComponent implements OnChanges {

  @ViewChild(MatTableExporterDirective, { static: true })
  exporter!: MatTableExporterDirective;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input("data") timecard: Timecard[] = [];
  dataSource = new MatTableDataSource(this.timecard);

  columnsToDisplay: string[] = ["data", "entrada", "saida", "horas_trabalhadas", "saldo", "actions"]

  constructor (
    private cdref: ChangeDetectorRef,
    private shared: SharePointService,
    private requests: BatsworksApiService,
    private toast: ToastrService) { }

  ngOnChanges(): void {
    this.cdref.detectChanges();
    this.dataSource = new MatTableDataSource(this.timecard);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getTotalSaldo()
  }

  updatePoint(point: Timecard) {
    this.shared.changeValue(point)
  }

  deletePoint(point: Timecard) {
    Swal.fire({
      text: "Deseja realmente deletar o dia?",
      icon: "info",
      showDenyButton: true,
      denyButtonText: "cancelar"
    }).then(btn => {
      if (btn.isConfirmed) {
        if (point.id == undefined) return;
        this.requests.deleteOneCard(point.id).subscribe(
          (data) => {
            this.toast.success(data.message);
          },
          (error) => this.toast.error(error.message)
        );
      }
      if (btn.isDenied) return;
    })
  }

  getTotalSaldo() {
    return this.timecard.map(ap => ap!.saldo).reduce((index, value) => this.ifUndefined(index) + this.ifUndefined(value), 0)
  }

  getTotalHoras() {
    return this.timecard.map(ap => ap!.horasTrabalhadas).reduce((index, value) => this.ifUndefined(index) + this.ifUndefined(value), 0)

    // let hora_total = 0;
    // let minuto_total = 0;
    // this.timecard.map(ap => {
    //   const horas = ap.horasTrabalhadas.toLowerCase().trim();
    //   const horas_index = horas.indexOf("h");
    //   const min_lasIndex = horas.lastIndexOf("e");
    //   const hora = horas.substring(0, horas_index).trim()
    //   const minutes = horas.substring(min_lasIndex + 1, horas.indexOf("min")).trim()
    //   hora_total += Number(hora);
    //   minuto_total += Number(minutes);
    // });
    // return `${hora_total} horas ${minuto_total} min`
  }

  ifUndefined(value: any): number {
    if (value == undefined) return 0;
    return value;
  }

  exportFile() {
    this.exporter.exportTable(ExportType.CSV, {
      fileName: "batsworks-cardpoints",
      delimiter: ",",
      compression: true,
      Props: {
        Author: "Felipes b.Silva - BatsWorks"
      }
    });
  }

}
