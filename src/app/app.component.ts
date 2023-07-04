import { Message } from './interfaces/message';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked, OnInit {
  title = 'timecard';
  request: boolean = false;

  constructor (public load: LoadingService, private cdref: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
    this.load.loading$.subscribe(request => this.request = request);
    this.cdref.detectChanges()
  }

  ngOnInit(): void {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
      worker.postMessage('hello');
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

}
