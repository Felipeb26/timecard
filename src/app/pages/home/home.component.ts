import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Timecard } from 'src/app/interfaces/timecard';
import { RequestsService } from 'src/app/services/requests.service';
import { SharePointService } from 'src/app/services/shared/share-point.service';

const MID_GREEN = "#197d19";
const DEEP_BLACK = "rgb(21, 21, 21)";
const TABLE = "table";
const CALENDAR = "calendar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  marcando_ponto: string = "assets/marca_ponto.png";
  logo: string = "assets/batworks.png";
  constructor () { }

  ngOnInit(): void {

  }

}
