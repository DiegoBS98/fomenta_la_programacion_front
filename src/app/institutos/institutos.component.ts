import { Component, OnInit } from '@angular/core';
import {Instituto} from './instituto';
import {InstitutoService} from './instituto.service';
import Swal from 'sweetalert2';
import { LoginService } from '../usuarios/login.service';
@Component({
  selector: 'app-institutos',
  templateUrl: './institutos.component.html',
  styleUrls: ['./institutos.component.css']
})
export class InstitutosComponent implements OnInit {
  
  institutos : Instituto[];
  constructor(private institutoService : InstitutoService,
    private loginService : LoginService) { }

  ngOnInit() {
    this.institutoService.getInstitutos().subscribe(
    institutos => this.institutos =institutos
    );
  }

    delete(instituto : Instituto) : void {
      Swal.fire({
        title: '¿Seguro que quieres eliminar este instituto?',
        text: "No podrás gestionarlo una vez eliminado",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero borrar!'
      }).then((result) => {
        if (result.value) {
          this.institutoService.delete(instituto.id_instituto).subscribe(
            response => {
              this.institutos = this.institutos.filter(ins => ins !== instituto)
              Swal.fire(
                'Instituto Eliminado!',
                `El instituto ${instituto.nombre} ha sido eliminado con exito`,
                'success'
              )
            }
          )
        }
      })
      }

}
