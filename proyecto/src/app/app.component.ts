import { Component, OnInit } from '@angular/core';
// import { Usuario } from './modelos/usuario';
import { ServidorService } from './servicios/servidor.service';
import { UsuarioService,Usuario } from './servicios/usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'node-express-angular';
  status = 'DOWN';
  usuarios: Usuario[]=<any>[];

  constructor(
    private estadoServidor: ServidorService
    ,private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.estadoServidor
      .getStatus()
      .subscribe((result: any) => {
        this.status = result.status;
      });
    this.usuarioService
      .getAll()
      .subscribe((result: any)=>{
        this.usuarios=result;
      })
  }

  nuevoUsuario(e:Event) {
    console.log(e)
    e.preventDefault()
  }

}