import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  title = 'timecard';
  request: boolean = false;

  constructor (public load: LoadingService, private cdref: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
    this.load.loading$.subscribe(request => this.request = request);
    this.cdref.detectChanges()
  }

}
