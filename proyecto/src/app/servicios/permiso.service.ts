import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  readonly URL = 'http://localhost:8080/api/permisos';

  constructor(private clienteHTTP: HttpClient) { }

  getAll(){
    return this.clienteHTTP.get(this.URL+'/');
  }

}

export interface Permiso{
  ID: number;
  descripcion: string;
}