import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Timecard } from 'src/app/interfaces/timecard';
import { SharePointService } from 'src/app/services/shared/share-point.service';

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

  constructor (private shared: SharePointService) { }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.timecard);
    this.dataSource.sort = this.sort
    console.log(this.timecard)
  }

  updatePoint(point: Timecard) {
    this.shared.changeValue(point)
  }

}
