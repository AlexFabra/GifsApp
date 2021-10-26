import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial(){
    //... operador spread para romper la referencia con historial
    return [...this._historial];
  }

  buscarGifs(query: string){
    this._historial.unshift(query);
    console.log(this._historial)
  }

}
