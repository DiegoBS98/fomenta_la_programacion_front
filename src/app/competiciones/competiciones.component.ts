import { Component, OnInit } from '@angular/core';
import {Competicion} from './competicion';
import {COMPETICIONES} from './competiciones.json';
import {CompeticionService} from './competicion.service';
@Component({
  selector: 'app-competiciones',
  templateUrl: './competiciones.component.html',
  styleUrls: ['./competiciones.component.css']
})
export class CompeticionesComponent implements OnInit {

competiciones : Competicion[];

  constructor( private competicionService : CompeticionService) { }

    ngOnInit() {
      this.competicionService.getCompeticiones().subscribe(
      competiciones => this.competiciones =competiciones
      );
    }

}
