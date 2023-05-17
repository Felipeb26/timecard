import { AfterViewInit, Component } from '@angular/core';
import { Timecard } from 'src/app/interfaces/timecard';
import { SharePointService } from 'src/app/services/shared/share-point.service';

@Component({
  selector: 'app-point-crud',
  templateUrl: './point-crud.component.html',
  styleUrls: ['./point-crud.component.scss']
})
export class PointCrudComponent implements AfterViewInit {

  cardpoint: Timecard | undefined;
  data: any = new Date();

  constructor (private shared: SharePointService) { }

  ngAfterViewInit(): void {
    this.shared.value.subscribe(it => {
      console.log(it);
      this.cardpoint = it;
    })
  }

}
