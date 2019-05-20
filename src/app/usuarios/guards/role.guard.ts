import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
    constructor(private loginService : LoginService,
      private router : Router){
  
    }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.loginService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }
  
      let role = next.data['role'] as string;
      console.log(role);
      if (this.loginService.hasRole(role)) {
        return true;
      }
      Swal.fire('Acceso denegado', `Holassaa ${this.loginService.usuario.nombreUsuario} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/competiciones']);
      return false;
  }
  
}
