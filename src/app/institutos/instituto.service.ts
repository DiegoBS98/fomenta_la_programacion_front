import { Injectable } from '@angular/core';
import{Instituto} from './instituto';
import { of, Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router'
import { LoginService } from '../usuarios/login.service';


@Injectable({
  providedIn: 'root'
})
export class InstitutoService {
  private httpHeader : HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  urlBack : string = 'http://localhost:8080/institutos';
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
        swal.fire('Permisos', 'No tiene suficientes permisos para realizar esta accion', 'warning')
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
 
 
   getInstitutos():Observable<Instituto[]>{
    /**
     * Creamos el flujo con los datos que nos llegan para poder devovlerlos como observable
     */
    return this.http.get<Instituto[]>(this.urlBack);
  }

  create(instituto : Instituto) :Observable<any>{
    return this.http.post<Instituto>(this.urlBack, instituto, {headers : this.httpHeader}).pipe(
      catchError( e => {
        console.error(e.error.mensaje);
        swal.fire('Error al Crear', e.error.error, 'error');
        return throwError(e);
      }

      )
    )
  } 

  getInstituto(id): Observable<any> {
    return this.http.get<Instituto>(`${this.urlBack}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/institutos']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        //Utilizamos throw erorr para convertir la respuesta elun observable
        return throwError(e);
      }
      )
    )
  }

  update(instituto : Instituto) : Observable<any>{
    return this.http.put<Instituto>(`${this.urlBack}/${instituto.id_instituto}`, instituto, {headers: this.httpHeader}).pipe(
      catchError( e => {
        console.error(e.error.mensaje);
        swal.fire('Error al ACTUALIZAR', e.error.error, 'error');
        return throwError(e);
      }

      )
    );
  }
  delete(id : number) : Observable<any>{
    return this.http.delete<Instituto>(`${this.urlBack}/${id}`,{headers: this.httpHeader}).pipe(
      catchError( e => {
        console.error(e.error.mensaje);
        swal.fire('Error al Eliminar', e.error.error, 'error');
        return throwError(e);
      }

      )
    );
  }
}
