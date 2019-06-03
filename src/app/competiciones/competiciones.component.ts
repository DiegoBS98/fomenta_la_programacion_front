import { Component, OnInit } from '@angular/core';
import { Competicion } from './competicion';
import { CompeticionService } from './competicion.service';
import Swal from 'sweetalert2';
import { LoginService } from '../usuarios/login.service';
import {ModalService} from './detalle/modal.service';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-competiciones',
  templateUrl: './competiciones.component.html',
  styleUrls: ['./competiciones.component.css']
})


export class CompeticionesComponent implements OnInit {
  competicionSeleccionada : Competicion;
  competiciones: Competicion[];
  errores : String[];
  constructor(private competicionService: CompeticionService, private loginService: LoginService,
    private modalService : ModalService, private router : Router) { }

  ngOnInit() {
    this.competicionService.getCompeticiones().subscribe(
      competiciones => this.competiciones = competiciones
    );
  }

  registrarEnEvento( competicion : Competicion){
    console.log(this.loginService.usuario.idUsuario);
    console.log(competicion.idCompeticion);
    this.competicionService.registrarEnEvento(this.loginService.usuario.idUsuario, competicion.idCompeticion).subscribe(
      any => {
        this.router.navigate([`competiciones`])
        Swal.fire('Registro Completado', `${this.loginService.usuario.nombreUsuario} te has registrado con exito en el evento ${competicion.idCompeticion}!`, 'success')
        .then((result) => {
          location.reload(true);
        })
      },
   err => {
    
    this.errores = err.error.errors as string[];
    
     console.error('Código del error desde el backend' + err.status);
   
   }
    );
  }
  



  /**
   * 
   */
  delete(competicion: Competicion): void {
    /* Swal.fire({
       title: '¿Estas seguro?',
       text: "No podras revertir los cambios!",
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, eliminar!'
     }).then((result) => {
       if (result.value) {
         this.competicionService.delete(competicion.idCompeticion).subscribe(
           response => {
             
             this.competiciones = this.competiciones.filter(comp => comp !== competicion)
             Swal.fire(
             'Eliminado!',
             'Se ha eliminado con exito.',
             'success'
           )
           }
         )

       }
     })
     this.competicionService.delete(competicion.idCompeticion).subscribe(
       response => {
         
         this.competiciones = this.competiciones.filter(comp => comp !== competicion)
       }
     )
   }*/
    Swal.fire({
      title: '¿Seguro que quieres eliminar este cliente?',
      text: "No podrás gestionarlo una vez eliminado",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero borrar!'
    }).then((result) => {
      if (result.value) {
        this.competicionService.delete(competicion.idCompeticion).subscribe(
          response => {
            this.competiciones = this.competiciones.filter(cli => cli !== competicion)
            Swal.fire(
              '¡Cliente Eliminado!',
              `El cliente ${competicion.nombreCompeticion} ha sido eliminado con exito`,
              'success'
            )
          }
        )
      }
    })
  }

  abrirModal(competicion :Competicion): any{
    this.competicionSeleccionada = competicion;
    this.modalService.abrirModal()
  }

}
