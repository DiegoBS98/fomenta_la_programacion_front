import { Injectable } from '@angular/core';
import { Competicion } from './competicion'
import { of, Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swa1 from 'sweetalert2';
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class CompeticionService {

  private httpHeader: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  /**
   * 
   * Declaramos variable con la ruta del backend
   */
  urlBack: string = 'http://localhost:8080/competiciones';
  /**
   * Declaramos la variable con la respuesta del back
   */
  constructor(private http: HttpClient,
    private router : Router) { }

  getCompeticiones(): Observable<Competicion[]> {
    /**
     * Creamos el flujo con los datos que nos llegan para poder devovlerlos como observable
     */
    return this.http.get<Competicion[]>(this.urlBack);
  }

  create(competicion: Competicion): Observable<any> {
    return this.http.post<Competicion>(this.urlBack, competicion, { headers: this.httpHeader }).pipe(
      catchError( e => {
        console.error(e.error.mensaje);
        swa1.fire('Error al crear', e.error.error, 'error');
        return throwError(e);
      }

      )
    )
  }

  getCompeticion(id): Observable<Competicion> {
    return this.http.get<Competicion>(`${this.urlBack}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/competiciones']);
        console.error(e.error.mensaje);
        swa1.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      }
      )
    )
  }

  update(competicion: Competicion): Observable<any> {
    return this.http.put<Competicion>(`${this.urlBack}/${competicion.idCompeticion}`, competicion, { headers: this.httpHeader }).pipe(
      catchError( e => {
        console.error(e.error.mensaje);
        swa1.fire('Error al ACTUALIZAR', e.error.error, 'error');
        return throwError(e);
      }

      )
    )
  }

  delete(id : number) : Observable<Competicion>{
    return this.http.delete<Competicion>(`${this.urlBack}/${id}`, {headers : this.httpHeader}).pipe(
      catchError( e => {
        console.error(e.error.mensaje);
        swa1.fire('Error al ELIMINAR', e.error.error, 'error');
        return throwError(e);
      }

      )
    )
  }
} 
