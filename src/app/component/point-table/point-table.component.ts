import { RequestsService } from './../../services/requests.service';
import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Timecard } from 'src/app/interfaces/timecard';
import { SharePointService } from 'src/app/services/shared/share-point.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-point-table',
  templateUrl: './point-table.component.html',
  styleUrls: ['./point-table.component.scss']
})
export class PointTableComponent implements OnChanges {

  @ViewChild(MatSort) sort!: MatSort;
  @Input("data") timecard: Timecard[] = [];
  dataSource = new MatTableDataSource(this.timecard);

  columnsToDisplay: string[] = ["data", "entrada", "saida", "horas_trabalhadas", "saldo", "actions"]

  constructor (private shared: SharePointService,
      private requests:RequestsService ) { }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.timecard);
    this.dataSource.sort = this.sort
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
          data => console.log(data)
        );
      }
      if (btn.isDenied) return;
    })
  }

}
