import { Instituto } from '../institutos/instituto';

export class Usuario {
    idUsuario : number;
	
	dni : string;
    
    nombreUsuario : string;
	
	apellidoUsuario : string;
	
	password : string;
	
	emailUsuario : string;

	instituto : Instituto;

	roles: string[] = [];

}
