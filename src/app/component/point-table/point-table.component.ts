import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Timecard } from 'src/app/interfaces/timecard';
import { SharePointService } from 'src/app/services/shared/share-point.service';
import Swal from 'sweetalert2';
import { RequestsService } from './../../services/requests.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-point-table',
  templateUrl: './point-table.component.html',
  styleUrls: ['./point-table.component.scss']
})
export class PointTableComponent implements OnChanges {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input("data") timecard: Timecard[] = [];
  dataSource = new MatTableDataSource(this.timecard);

  columnsToDisplay: string[] = ["data", "entrada", "saida", "horas_trabalhadas", "saldo", "actions"]

  constructor (private shared: SharePointService,
    private requests: RequestsService,
    private toast: ToastrService) { }

  ngOnChanges(): void {
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
        this.requests.deleteOne(point.id).subscribe(
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
    return this.timecard.map(ap => ap.saldo).reduce((index, value) => index + value, 0)
  }

  getTotalHoras() {
    let hora_total = 0;
    let minuto_total = 0;
    this.timecard.map(ap => {
      const horas = ap.horas_trabalhadas.toLowerCase().trim();
      const horas_index = horas.indexOf("h");
      const min_lasIndex = horas.lastIndexOf("e");
      const hora = horas.substring(0, horas_index).trim()
      const minutes = horas.substring(min_lasIndex+1, horas.indexOf("min")).trim()
      hora_total += Number(hora);
      minuto_total += Number(minutes);
    });
    return `${hora_total} horas ${minuto_total} min`
  }
}
