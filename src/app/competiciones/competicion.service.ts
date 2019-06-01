import { Injectable,Input } from '@angular/core';
import { Competicion } from './competicion'
import { of, Observable, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import swa1 from 'sweetalert2';
import {Router} from '@angular/router'
import { LoginService } from '../usuarios/login.service';

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
    private router : Router,
    private loginService : LoginService) { }

  
  
    isNoAutorizado(e): boolean{
      if(e.status==401){
        /**Para que la sesion expire cuando el token haya caducado.. */ 
        if(this.loginService.isAuthenticated()){
            this.loginService.logout();
            this.router.navigate(['/login']);
            return true;
          }
      }
      if(e.status==403){
        this.router.navigate(['/competiciones']);
        swa1.fire('Permisos', 'No tiene suficientes permisos para realizar esta accion', 'warning')
        return true;
      }
      return false;
    }

    private agregarAuthorizationHeader(){
      //Conseguimos el token
      let token = this.loginService.token;
      if(token != null){
        return this.httpHeader.append('Authorization', 'Bearer' + token)
      }
      return this.httpHeader;
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
    return this.http.post(this.urlBack, competicion,{ headers: this.agregarAuthorizationHeader() }).pipe(
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

  update(competicion: Competicion): Observable<any> {
    return this.http.put<any>(`${this.urlBack}/${competicion.idCompeticion}`, competicion, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swa1.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id : number) : Observable<Competicion>{
    return this.http.delete<Competicion>(`${this.urlBack}/${id}`).pipe(
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

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlBack}/upload`, formData, {
      reportProgress: true
    });
    

    return this.http.request(req);

  }


  registrarEnEvento(idUsuario, idCompeticion) : Observable<any>{
    
      console.log('Funcion del servicio: id usuario '+idUsuario+' Competicion'+idCompeticion);
      
      return this.http.post<any>(
        `${this.urlBack}/${idCompeticion}/${idUsuario}`, { headers: this.agregarAuthorizationHeader() }
      ).pipe(
        catchError(e=>{
          swa1.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }


} 
