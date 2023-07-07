import { Message } from './interfaces/message';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked, OnInit {
  title = 'timecard';
  request: boolean = false;

  constructor (
    public load: LoadingService,
    private cdref: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
    this.load.loading$.subscribe(request => this.request = request);
    this.cdref.detectChanges()
  }

  ngOnInit(): void {

  }

}
