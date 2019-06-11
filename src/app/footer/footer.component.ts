import { Component, OnInit } from '@angular/core';
import { CompeticionesComponent } from '../competiciones/competiciones.component';
import { Competicion } from '../competiciones/competicion';
import { LoginService } from '../usuarios/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private loginService : LoginService ) { }

  ngOnInit() {
  }

}
