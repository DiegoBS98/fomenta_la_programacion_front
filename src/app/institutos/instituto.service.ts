import { Injectable } from '@angular/core';
import{Instituto} from './instituto';
import {of, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {
  urlBack : string = 'http://localhost:8080/institutos';
  constructor(private http: HttpClient) { }
  getInstitutos():Observable<Instituto[]>{
    /**
     * Creamos el flujo con los datos que nos llegan para poder devovlerlos como observable
     */
    return this.http.get<Instituto[]>(this.urlBack);
  }
}
