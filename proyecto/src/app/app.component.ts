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

  enviarUsuario(e:Event) {
    e.preventDefault()
    
    // TODO investigar si esto puede ser más feo
    let u: Usuario=((Object.fromEntries(new FormData(e.target as HTMLFormElement))) as unknown) as Usuario;
    
    this.usuarioService
      .create(u)
      .subscribe((result: any) => {
        // TODO handle errors
        this.usuarios.push(result as Usuario);
      })
  }

  eliminarUsuario() {
    let IDUsuario:number=Number.parseInt((document.getElementById('usuarios-lista') as HTMLInputElement)?.value);
    
    if(IDUsuario)
      this.usuarioService
        .delete(IDUsuario)
        .subscribe((result: any)=>{
          // TODO handle errors
          this.usuarios.splice(this.usuarios.findIndex(u=>u.ID==IDUsuario),1)
        })
  }

}