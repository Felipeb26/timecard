import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { Timecard } from '../interfaces/timecard';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  url: string = "https://back-mark-point.vercel.app/";

  constructor (private httpClient: HttpClient) { }

  option = {
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application-json",
      "cors": "*"
    })
  }

  findAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}points`);
  }

}
