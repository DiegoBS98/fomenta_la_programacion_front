import { Component, OnInit } from '@angular/core';
import {Instituto} from './instituto';
import {InstitutoService} from './instituto.service';
@Component({
  selector: 'app-institutos',
  templateUrl: './institutos.component.html',
  styleUrls: ['./institutos.component.css']
})
export class InstitutosComponent implements OnInit {
  
  institutos : Instituto[];
  constructor(private institutoService : InstitutoService) { }

  ngOnInit() {
    this.institutoService.getInstitutos().subscribe(
    institutos => this.institutos =institutos
    );
  }

}
