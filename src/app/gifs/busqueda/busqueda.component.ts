import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  //para saber qué recibimos (tendriamos que tener en el html '(keyup)="buscar($event)"':)
  // buscar(event:KeyboardEvent){
  //   console.log(event)
  // }
  //para borrar los datos de origen podríamos hacerlo así:
  //document.querySelector('input').value = '';

  //usaremos un decorador para acceder a txtBuscar (vease: ! non-null assertion operator)
  //con este decorador podemos acceder a funcionalidades como focus, select, etc. aparte de value: 
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    this.gifsService.buscarGifs(valor)
  }


}
