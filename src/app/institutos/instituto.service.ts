import { Injectable } from '@angular/core';
import{Instituto} from './instituto';
import {of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Competicion } from '../competiciones/competicion';

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

  getInstituto(id) : Observable<Instituto>{
    return this.http.get<Instituto>(`${this.urlBack}/${id}`)
  }

  update(instituto : Instituto) : Observable<Instituto>{
    return this.http.put<Instituto>(`${this.urlBack}/${instituto.id_instituto}`, instituto, {headers: this.httpHeader});
  }
  delete(id : number) : Observable<Instituto>{
    return this.http.delete<Instituto>(`${this.urlBack}/${id}`,{headers: this.httpHeader});
  }
}
