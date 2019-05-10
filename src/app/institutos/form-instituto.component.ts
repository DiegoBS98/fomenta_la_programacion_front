import { Component, OnInit } from '@angular/core';
import { Instituto } from './instituto';
import { InstitutoService } from './instituto.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-instituto',
  templateUrl: './form-instituto.component.html',
  styleUrls: ['./form-instituto.component.css']
})
export class FormInstitutoComponent implements OnInit {

  instituto : Instituto = new Instituto();
  private titulo : string = 'Añadir Instituto';

  constructor(private institutoService : InstitutoService, 
    private router : Router,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
    this.cargarInstituto()
  }

  cargarInstituto() : void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params[`id`]
      if(id){
        this.institutoService.getInstituto(id).subscribe(
          (instituto) => this.instituto =instituto
        )
      }
    })
   }

  create() : void{
    /**
      * Invocamos el metodo create de la clase service
      */
     this.institutoService.create(this.instituto).subscribe(
      instituto => {
        this.router.navigate(['/institutos'])
        Swal.fire('Instituto añadido', `Instituto ${instituto.nombre} añadido con éxito`, 'success')
      }
     )
  }

  update() : void
  {
    this.institutoService.update(this.instituto).subscribe(
      instituto => {
        this.router.navigate(['/institutos'])
        Swal.fire('Instituto actualizado', `Instituto ${instituto.nombre} actualizado con éxito`, 'success') 
      } 
    )
  }
}
