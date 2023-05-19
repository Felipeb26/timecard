import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message';
import { Timecard } from '../interfaces/timecard';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  url: string = "https://back-mark-point.vercel.app/points/";

  constructor (private httpClient: HttpClient) { }

  findAll(): Observable<Timecard[]> {
    return this.httpClient.get<Timecard[]>(`${this.url}`);
  }

  post(cardpoint: Timecard): Observable<Message> {
    return this.httpClient.post<Message>(`${this.url}`, cardpoint);
  }

  deleteOne(id: string | undefined): Observable<Message> {
    return this.httpClient.delete<Message>(`${this.url}${id}`);
  }
}
