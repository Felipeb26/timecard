import { Timecard } from './../../interfaces/timecard';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharePointService {

  private timepoint!:Timecard;
  private valueSource = new BehaviorSubject<Timecard>(this.timepoint);
  public value = this.valueSource.asObservable();

  constructor() { }

  changeValue(value:Timecard){
    this.valueSource.next(value);
  }
}
