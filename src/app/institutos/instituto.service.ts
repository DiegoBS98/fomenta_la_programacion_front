import { Injectable } from '@angular/core';
import{Instituto} from './instituto';
import {of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {
  private httpHeader : HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  urlBack : string = 'http://localhost:8080/institutos';
  constructor(private http: HttpClient) { }
  getInstitutos():Observable<Instituto[]>{
    /**
     * Creamos el flujo con los datos que nos llegan para poder devovlerlos como observable
     */
    return this.http.get<Instituto[]>(this.urlBack);
  }

  create(instituto : Instituto) :Observable<Instituto>{
    return this.http.post<Instituto>(this.urlBack, instituto, {headers : this.httpHeader})
  } 
}
