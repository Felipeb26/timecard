import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Login } from "../interfaces/login";
import { Token } from '../interfaces/token';
import { Pagination } from '../interfaces/pagination';
import { Persona } from '../interfaces/persona';

@Injectable({
  providedIn: 'root'
})
export class BatsworksApiService {

  private url: string = "https://batsworks-timecard.onrender.com/batsworks";

  private login_controller: string = "/v1/login/";
  private persona_controller: string = "/v1/persona/";
  private card_controller: string = "/v1/cardpoint/";

  constructor (private http: HttpClient) { }

  authTime(): number | Date {
    const time = new Date();
    time.setHours(time.getHours() + 12);
    return time;
  }

  login(login: Login): Observable<Token> {
    return this.http.post<Token>(`${this.url}${this.login_controller}authenticate`, login);
  }
  loginGithub(): Observable<any> {
    return this.http.get<any>(`${this.url}${this.login_controller}github`);
  }

  findById(id: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.url}${this.persona_controller}${id}`)
  }

  findPersona(email: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.url}${this.persona_controller}data?email=${encodeURIComponent(email)}`);
  }

  registerPersona(persona: Persona): Observable<Token> {
    return this.http.post<Token>(`${this.url}${this.login_controller}register`, persona);
  }

  deletePersona(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}${this.persona_controller}${id}`)
  }


}
