import { Component, OnInit } from '@angular/core';
import { Competicion } from './competicion';
import { CompeticionService } from './competicion.service';
import { Router } from '@angular/router';

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

  private titulo:string = 'Crear Evento'
  /**
   * Como tendremos que implementar los metodos crud de la clase service
   * tenemos que inyectarla en el constructor
   */
  constructor(private competicionService : CompeticionService,private router : Router) { }

  ngOnInit() {
  }

  /**
   * Metodo al que llamaremos cuando se envie el formulario
   */

   public crear() : void{
     /**
      * Invocamos el metodo create de la clase service
      */
     this.competicionService.create(this.competicion).subscribe(
       response => this.router.navigate(['/competiciones'])
     )
   }

}
