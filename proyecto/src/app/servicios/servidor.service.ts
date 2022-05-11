import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  constructor(private clienteHTTP: HttpClient) {}

  getStatus(){
    return this.clienteHTTP.get('http://localhost:8080/api/status');
  }

}
