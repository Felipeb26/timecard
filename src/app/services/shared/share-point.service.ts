import { Timecard } from './../../interfaces/timecard';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharePointService {

  private timepoint!: Timecard;
  private valueSource = new BehaviorSubject<Timecard>(this.timepoint);
  public value = this.valueSource.asObservable();

  private update: boolean = false;
  private updateSource = new BehaviorSubject<boolean>(this.update)
  public updateValue = this.updateSource.asObservable();

  constructor () { }

  changeValue(value: Timecard) {
    this.valueSource.next(value);
  }

  needsUpdate(value: boolean) {
    this.updateSource.next(value);
  }
}
