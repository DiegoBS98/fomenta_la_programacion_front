import { Injectable } from '@angular/core';
import {Competicion} from './competicion'
import {of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CompeticionService {

  private httpHeader : HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  /**
   * 
   * Declaramos variable con la ruta del backend
   */
  urlBack : string = 'http://localhost:8080/competiciones';
  /**
   * Declaramos la variable con la respuesta del back
   */
  constructor(private http : HttpClient) { }

  getCompeticiones():Observable<Competicion[]>{
    /**
     * Creamos el flujo con los datos que nos llegan para poder devovlerlos como observable
     */
    return this.http.get<Competicion[]>(this.urlBack);
  }

  create(competicion : Competicion) :Observable<Competicion>{
    return this.http.post<Competicion>(this.urlBack, competicion, {headers : this.httpHeader})
  } 
}
