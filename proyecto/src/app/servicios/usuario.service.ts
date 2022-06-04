import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
// import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  readonly URL = 'http://localhost:8080/api/usuarios';

  constructor(private clienteHTTP: HttpClient) { }

  create(usuario: Usuario) {
    return this.clienteHTTP.post(this.URL+'/',usuario/* .serialize() */);
  }
  
  getAll(){
    return this.clienteHTTP.get(this.URL+'/');
  }

  getByID(id:number){
    return this.clienteHTTP.get(this.URL+`/${id}`);
  }

  delete(id:number){
    return this.clienteHTTP.delete(this.URL+`/${id}`);
  }

  edit(usuario: Usuario){
    return this.clienteHTTP.patch(this.URL+`/${usuario.ID/* .getID() */}`,usuario/* .serialize() */);
  }

}

export interface Usuario{
  ID?: number;
  correo: string;
  contrasenia?: string;
  nombreUsuario: string;
  nombreCompleto: string;
}