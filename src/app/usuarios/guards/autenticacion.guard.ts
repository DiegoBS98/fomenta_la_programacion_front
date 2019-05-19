import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {
  constructor(private loginService : LoginService,
    private router : Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.loginService.isAuthenticated())
    {
      if(this.tokenExpirado()){
        //Si el token ha expirado, cerramos sesion y redirigimos a login
        this.loginService.logout();
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  tokenExpirado():boolean {
    //Obtenemos el token
    let token = this.loginService.token;
    //Obtenemos los datos del token
    let payload = this.loginService.obtenerDatosToken(token);
    //Obtenemos fecha actual en milisegundos
    let fechaActual = new Date().getTime() /1000;
    //Si la fecha de expiracion del token es menor que la actual devolvemos true
    if(payload.exp < fechaActual){
      return true;
    }
    return false;

  }
  
}
