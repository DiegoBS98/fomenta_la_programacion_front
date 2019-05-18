import { Injectable } from '@angular/core';
import { Competicion } from './competicion'
import { of, Observable, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swa1 from 'sweetalert2';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class CompeticionService {

  private httpHeader: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private url:string ='/src/app/usuarios/login.component.html';
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

     isNoAutorizado(e): boolean{
      if(e.status==401 ||e.status==403){
        this.router.navigate(['/login']);
        return true;
      }
      return false;
    }

  getCompeticiones(): Observable<Competicion[]> {
    /**
     * Creamos el flujo con los datos que nos llegan para poder devovlerlos como observable
     */
    return this.http.get<Competicion[]>(this.urlBack).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  create(competicion: Competicion): Observable<Competicion> {
    return this.http.post(this.urlBack, competicion, { headers: this.httpHeader }).pipe(
      map((response : any) => response.competicion as Competicion),
      catchError( e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status == 400){
          return throwError(e);
        }

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
     
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        this.router.navigate(['/competiciones']);
        console.error(e.error.status);
        console.error(e.error.mensaje);
        swa1.fire('Error al acualizar', e.error.mensaje, 'error');
        return throwError(e);
      }
      )
    )
  }

  public update(competicion: Competicion): Observable<Competicion> {
    return this.http.put(`${this.urlBack}/${competicion.idCompeticion}`, competicion, { headers: this.httpHeader }).pipe(
      map((response : any) => response.competicion as Competicion),
      catchError( e => {
        if(this.isNoAutorizado(e)==true){
          return throwError(e);
        }

        if(e.status == 400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swa1.fire('Error al ACTUALIZAR', e.error.error, 'error');
        return throwError(e);
      }

      )
    )
  }

  delete(id : number) : Observable<Competicion>{
    return this.http.delete<Competicion>(`${this.urlBack}/${id}`, {headers : this.httpHeader}).pipe(
      map((response : any) => response.competicion as Competicion),
      catchError( e => {
       
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swa1.fire('Error al ELIMINAR', e.error.error, 'error');
        return throwError(e);
      }

      )
    )
  }
} 
