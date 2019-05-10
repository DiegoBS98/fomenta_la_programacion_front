import { Component, OnInit } from '@angular/core';
import { Instituto } from './instituto';
import { InstitutoService } from './instituto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-instituto',
  templateUrl: './form-instituto.component.html',
  styleUrls: ['./form-instituto.component.css']
})
export class FormInstitutoComponent implements OnInit {

  instituto : Instituto = new Instituto();
  private titulo : string = 'Añadir Instituto';

  constructor(private institutoService : InstitutoService, private router : Router) { }

  ngOnInit() {
  }

  public crear() : void{
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
}
