import { Component, OnInit } from '@angular/core';
import { Competicion } from './competicion';

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
  constructor() { }

  ngOnInit() {
  }

  /**
   * Metodo al que llamaremos cuando se envie el formulario
   */

   public crear() : void{
     console.log("Ha clickado");
     console.log(this.competicion);
   }

}
