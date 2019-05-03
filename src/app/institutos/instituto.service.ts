import { Injectable } from '@angular/core';
import{INSTITUTOS} from './institutos.json';
import{Instituto} from './instituto';
import {of, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {

  constructor() { }
  getInstitutos():Observable<Instituto[]>{
    /**
     * Creamos el flujo con los datos que nos llegan para poder devovlerlos como observable
     */
    return of(INSTITUTOS);
  }
}
