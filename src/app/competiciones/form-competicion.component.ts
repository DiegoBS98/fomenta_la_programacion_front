import { Component, OnInit } from '@angular/core';
import { Competicion } from './competicion';
import { CompeticionService } from './competicion.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swa1 from 'sweetalert2'

@Component({
  selector: 'app-form-competicion',
  templateUrl: './form-competicion.component.html',
  styleUrls: ['./form-competicion.component.css']
})
export class FormCompeticionComponent implements OnInit {

  /**
   * Los datos del formulario se añadiran a este objeto.
   * Esto se llama hacer un Binding
   */
  private competicion : Competicion = new Competicion();
  private errores : string[];
  private titulo:string = 'Crear Evento'
  /**
   * Como tendremos que implementar los metodos crud de la clase service
   * tenemos que inyectarla en el constructor
   */
  constructor(private competicionService : CompeticionService,
    private router : Router,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.cargarCompeticion()
  }

  /**
   * Metodo al que llamaremos cuando se envie el formulario
   */

   cargarCompeticion() : void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params[`id`]
      if(id){
        this.competicionService.getCompeticion(id).subscribe(
          (competicion) => this.competicion = competicion
        )
      }
    })
   }

   public crear() : void{
     /**
      * Invocamos el metodo create de la clase service
      */
     this.competicionService.create(this.competicion)
     .subscribe(
       competicion => {
         this.router.navigate(['/competiciones'])
         Swa1.fire('Nuevo evento', `Evento ${competicion.nombreCompeticion} creado con exito`, 'success')
       },
       err => {
         this.errores = err.error.errores as string[];
         console.log('Codigo de error desde el backend: ' +err.status );
         console.log(err.error.errores);
       }
     )
   }

   actualizar():void{
    this.competicionService.update(this.competicion)
    .subscribe(
      competicion => {
        this.router.navigate(['/competiciones'])
         Swa1.fire('Evento actualizado', `Evento ${competicion.nombreCompeticion} actualizado con exito`, 'success')
      },
      err => {
        this.errores = err.error.errores as string[];
        console.log('Codigo de error desde el backend: ' +err.status );
        console.log(err.error.errores);
      }
    )
   }

}
