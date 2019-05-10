import { Component, OnInit } from '@angular/core';
import { Instituto } from './instituto';

@Component({
  selector: 'app-form-instituto',
  templateUrl: './form-instituto.component.html',
  styleUrls: ['./form-instituto.component.css']
})
export class FormInstitutoComponent implements OnInit {

  instituto : Instituto = new Instituto();
  private titulo : string = 'Añadir Instituto';
  
  constructor() { }

  ngOnInit() {
  }

  public crear() : void{
    console.log("Ha clickado");
    console.log(this.instituto);
  }
}
