import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'timecard';
  request: boolean = false;

  constructor (public load: LoadingService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cdref.detectChanges();
  }

}
