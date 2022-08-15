import { Component, OnInit } from '@angular/core';
import { ServidorService } from './servicios/servidor.service';
import { UsuarioService,Usuario } from './servicios/usuario.service';
import { PermisoService,Permiso } from './servicios/permiso.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'node-express-angular';
  status = 'DOWN';
  usuarios: Usuario[]=<any>[];
  usuariosEnvio: Usuario[]=<any>[];
  permisos: Permiso[]=<any>[];
  editando=false;
  esperando=false;

  constructor(
    private estadoServidor: ServidorService
    ,private permisoService: PermisoService
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
      });
      
    this.permisoService
      .getAll()
      .subscribe((result: any)=>{
        this.permisos=result;
      });
  }

  obtenerIDUsuarioActual():number{
    return Number.parseInt((document.getElementById('usuarios-lista') as HTMLInputElement)?.value)
  }

  obtenerUsuarioActual():Usuario{
    return this.obtenerUsuarioPorID(this.obtenerIDUsuarioActual());
  }

  obtenerUsuarioPorID(ID:number):Usuario{
    return this.usuarios.find(u=>u.ID==ID) as Usuario;
  }

  enviarUsuario(e:Event) {
    e.preventDefault()
    
    // TODO investigar si esto puede ser más feo
    let  fd=new FormData(e.target as HTMLFormElement);
    let u: Usuario=((Object.fromEntries(fd)) as unknown) as Usuario;
    u.permisos=fd.getAll('permisos[]').map(val=>{
      return ({ID:+val}) as Permiso;
    });
    
    if(this.editando){
      this.usuarioService
        .edit(u)
        .subscribe((result: any) => {
          // TODO handle errors
          this.usuarios.splice(this.usuarios.findIndex(uv=>uv.ID==u.ID),1,u)
        })
    }else{
      delete u.ID;
      this.usuarioService
        .create(u)
        .subscribe((result: any) => {
          // TODO handle errors
          this.usuarios.push(result as Usuario);
        })
    }
  }

  eliminarUsuario() {
    let IDUsuario:number=this.obtenerIDUsuarioActual();
    
    if(IDUsuario){
      this.esperando=true;

      this.usuarioService
        .delete(IDUsuario)
        .subscribe((result: any)=>{
          // TODO handle errors
          this.usuarios.splice(this.usuarios.findIndex(u=>u.ID==IDUsuario),1);
          this.esperando=false;
          if(this.editando) // La eliminación usa el mismo campo que la edición, porque se bloquean los botones.
            this.cancelarEdicion();
        })
    }
  }

  editarUsuario() {
    // TODO edición de permisos
    let IDUsuario:number=this.obtenerIDUsuarioActual();
    let u = this.usuarios.find(u=>u.ID==IDUsuario) as any;
    for(let prop in u /* as Usuario */) {
      let input=document.getElementsByName(prop);
      if(input.length)
        ( input[0] as HTMLInputElement).value=u[prop];
    }

    for(let permiso of document.getElementsByName('permisos[]')){
      let permisoInput=permiso as HTMLInputElement;
      permisoInput.checked=u.permisos?.some((per:any)=>per.ID==permisoInput.value) as boolean;
    }

    this.editando=true;
  }

  cancelarEdicion(){
    (document.getElementById('usuarios-formulario') as HTMLFormElement).reset();
    this.editando=false;
  }

  enviarTokens(e:Event){
    e.preventDefault();

    let fd=new FormData(e.target as HTMLFormElement);
    let emisor=this.obtenerUsuarioPorID(this.obtenerIDUsuarioActual())
      ,receptor=this.obtenerUsuarioPorID(Number.parseInt(fd.get('usuario')?.valueOf() as string)) 
      ,tokens=Number.parseInt(fd.get('tokens')?.valueOf() as string);

    if(!receptor || !emisor || !tokens){
      alert('No se puede llevar a cabo esta operación.');
      return;
    }

    this.esperando=true;
    this.usuarioService
      .enviarTokens(
        emisor.ID as number
        ,receptor.ID as number
        ,tokens
      )
      .subscribe((result: any)=>{
        // TODO handle errors
        emisor.tokens-=tokens;
        receptor.tokens+=tokens;
        
        // La eliminación usa el mismo campo que la edición, porque se bloquean los botones.
        if(this.editando){
          let campoTokens=document.getElementById("usuarios-formulario-tokens") as HTMLInputElement;
          if((+campoTokens.value)>emisor.tokens)
            campoTokens.value=emisor.tokens.toString();
        } 
        this.esperando=false;
      });
  }

  normalizarTexto(texto:String){
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
  }

  actualizarListadoEnvio(e:Event){
    this.usuarioService
      .getFuzzilyByName((e.target as HTMLInputElement).value)
      .subscribe((result: any)=>{
        this.usuariosEnvio=result;
      });
  }

  limitarEnvioTokens(e:Event){
    (document.getElementById('tokens-cantidad')as HTMLInputElement).max=''+(this.obtenerUsuarioActual().tokens);
  }

  llenarDetalle(){
    this.usuarioService
      .getByID(this.obtenerIDUsuarioActual())
      .subscribe((result: any)=>{
        let usuarioConseguido=result as Usuario;

        for(let propiedadSimple of ['nombreCompleto','DNI','nombreUsuario','correo'/* ,'tokens' */]){
          (document.getElementById('detalle-'+propiedadSimple) as HTMLElement).innerText=(usuarioConseguido as any)[propiedadSimple];
        }

        (document.getElementById('detalle-tokens') as HTMLElement).innerText=''+(usuarioConseguido.tokensAsociadas||[]).length;

        let listaPermiso=(document.getElementById('detalle-permisos') as HTMLElement);
        listaPermiso.innerHTML='';
        for(let permiso of (usuarioConseguido.permisos||[])){
          let itemPermiso=document.createElement('LI');
          itemPermiso.innerText=permiso.descripcion;
          listaPermiso.appendChild(itemPermiso);
        }
      });
  }

}