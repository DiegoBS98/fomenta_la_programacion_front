import { Injectable } from '@angular/core';
import {Competicion} from './competicion'
import {COMPETICIONES} from './competiciones.json'
import {of, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompeticionService {

  constructor() { }

  getCompeticiones():Observable<Competicion[]>{
    /**
     * Creamos el flujo con los datos que nos llegan para poder devovlerlos como observable
     */
    return of(COMPETICIONES);
  }
}
