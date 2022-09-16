import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { API_URL } from './api-url';


@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  constructor(private clienteHTTP: HttpClient) {}

  getStatus(){
    return this.clienteHTTP.get(API_URL+'status');
  }

}
