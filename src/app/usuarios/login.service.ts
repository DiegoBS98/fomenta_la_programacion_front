import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _usuario: Usuario;
  private _token: string;

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.nombreUsuario);
    params.set('password', usuario.password);

    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }
  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombreUsuario = payload.user_name;
    this._usuario.roles = payload.authorities;

    console.log("Voy a mostrar el usuario : " + this._usuario);

    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }
}
