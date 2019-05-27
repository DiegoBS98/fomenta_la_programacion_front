import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CompeticionesComponent } from './competiciones/competiciones.component';
import{CompeticionService} from './competiciones/competicion.service';
import { InstitutosComponent } from './institutos/institutos.component';
import{RouterModule, Routes} from '@angular/router';
import{HttpClient, HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormCompeticionComponent } from './competiciones/form-competicion.component';
import {FormsModule} from '@angular/forms';
import { FormInstitutoComponent } from './institutos/form-instituto.component';
import { LoginComponent } from './usuarios/login.component';
import { AutenticacionGuard } from './usuarios/guards/autenticacion.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import{TokenInterceptor} from './usuarios/interceptores/token.interceptor'
import { InstitutoService } from './institutos/instituto.service';
import { ChatbotModule } from './chatbot/chatbot.module';
import { ChatbotService } from './chatbot/chatbot.service';
import { DetalleComponent } from './competiciones/detalle/detalle.component';



/**
 * Creamos constante con array de rutas
 */
const routes:Routes = [
  {path: '', redirectTo: '/competiciones', pathMatch: 'full'},
  {path: 'institutos', component: InstitutosComponent},
  {path: 'competiciones', component: CompeticionesComponent},
  {path: 'competiciones/page/:page', component: CompeticionesComponent},
  {path: 'competiciones/form', component: FormCompeticionComponent, canActivate: [RoleGuard],data: {role: 'ROLE_ADMIN'}},
  {path: 'competiciones/form/:id', component: FormCompeticionComponent, canActivate: [RoleGuard],data: {role: 'ROLE_ADMIN'}},
  {path: 'competiciones/ver/:id', component: DetalleComponent, canActivate: [RoleGuard],data: {role: 'ROLE_ADMIN'}},
  {path: 'institutos/form', component: FormInstitutoComponent, canActivate: [ RoleGuard],data: {role: 'ROLE_ADMIN'}},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatbotModule},
  {path: 'institutos/form/:id', component: FormInstitutoComponent, canActivate: [RoleGuard],data: {role: 'ROLE_ADMIN'} }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CompeticionesComponent,
    InstitutosComponent,
    FormCompeticionComponent,
    FormInstitutoComponent,
    LoginComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChatbotModule,
    FormsModule,
    RouterModule.forRoot(routes)
    
  ],
  providers: [
    CompeticionService,
    InstitutoService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
