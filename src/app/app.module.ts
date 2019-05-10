import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CompeticionesComponent } from './competiciones/competiciones.component';
import{CompeticionService} from './competiciones/competicion.service';
import { InstitutosComponent } from './institutos/institutos.component';
import{RouterModule, Routes} from '@angular/router';
import{HttpClient, HttpClientModule} from '@angular/common/http';
import { FormCompeticionComponent } from './competiciones/form-competicion.component';
import {FormsModule} from '@angular/forms';
import { FormInstitutoComponent } from './institutos/form-instituto.component';

/**
 * Creamos constante con array de rutas
 */
const routes:Routes = [
  {path: '', redirectTo: '/competiciones', pathMatch: 'full'},
  {path: 'institutos', component: InstitutosComponent},
  {path: 'competiciones', component: CompeticionesComponent},
  {path: 'competiciones/form', component: FormCompeticionComponent},
  {path: 'institutos/form', component: FormInstitutoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CompeticionesComponent,
    InstitutosComponent,
    FormCompeticionComponent,
    FormInstitutoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
    
  ],
  providers: [
    CompeticionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
