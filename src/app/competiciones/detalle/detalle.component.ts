import { Component, OnInit,Input } from '@angular/core';
import { Competicion } from '../competicion';
import { CompeticionService } from '../competicion.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() competicion : Competicion;  
  
  private fotoSeleccionada : File;
  progreso: number = 0;
  constructor(private competicionService : CompeticionService,
    private activatedRoute : ActivatedRoute,
    private modalService : ModalService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.competicionService.getCompeticion(id).subscribe(cliente => {
          this.competicion = cliente;
        });
      }
    });
  }

  ////////////////////////
  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

 /* subirFoto():void{
    console.log(this.competicion.idCompeticion)
    this.competicionService.subirFoto(this.fotoSeleccionada, this.competicion.idCompeticion).subscribe(
      //Subscribimos 
      competicion => {  
        this.competicion = competicion;
        Swal.fire('La foto se ha subido correctamente');
      }
    );
  }*/

  subirFoto() {

    if (!this.fotoSeleccionada) {
      Swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.competicionService.subirFoto(this.fotoSeleccionada, this.competicion.idCompeticion)
        .subscribe(event => {
          //Si el evento esta en curso, calculamos porcentaje
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.competicion = response.competicion as Competicion;
            this.modalService.notificarUpload.emit(this.competicion);
            Swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
            //this.rout
          }
        });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
    }


}
