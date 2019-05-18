import { Component, OnInit } from '@angular/core';
import {LoginService} from '../usuarios/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /**Inyectamos la clase login Service para poder acceder a sus metodos  */
 
  constructor(private loginService : LoginService) { }

  ngOnInit() {
  }

  logout(): void{
    this.loginService.logout();
    Swal.fire('Login', 'Has cerrado sesión con éxito', 'success')
  }

}
