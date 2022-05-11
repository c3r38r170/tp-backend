import { Component, OnInit } from '@angular/core';
import { ServidorService } from './servicios/servidor.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'node-express-angular';
  status = 'DOWN';

  constructor(
    private estadoServidor: ServidorService
  ) { }

  ngOnInit() {
    this.estadoServidor
      .getStatus()
      .subscribe((result: any) => {
        this.status = result.status;
      });
  }

}