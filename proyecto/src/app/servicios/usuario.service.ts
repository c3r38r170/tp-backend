import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private clienteHTTP: HttpClient) { }
  
  getAll(){
    return this.clienteHTTP.get('http://localhost:8080/usuario');
  }

}
