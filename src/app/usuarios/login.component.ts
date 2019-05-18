import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  usuario:Usuario;
  
  constructor( private loginService : LoginService,
    private router: Router) { 
    this.usuario = new Usuario()
  }
  
  ngOnInit() {
   
  }

  login() : void {

    console.log(this.usuario.nombreUsuario, this.usuario.password);
    console.log(this.usuario);
    
    if(this.usuario.nombreUsuario == null || this.usuario.password == null)
    {
      Swal.fire('Error en Inicio de sesión', 'Username o password vacías!', 'error');
      //Para salirnos...
      return;
    }

    this.loginService.login(this.usuario).subscribe(
      response =>{
        console.log(response);

        this.loginService.guardarUsuario(response.access_token);
        this.loginService.guardarToken(response.access_token);
        let usuario = this.loginService.usuario
        this.router.navigate(['/competiciones']);
        Swal.fire('Login',` ${usuario.nombreUsuario}Has iniciado sesion con éxito!`, 'success');
      }, err => {
        if (err.status == 400) {
          Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    }
    )
  }
}
