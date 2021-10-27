import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'ta13eAtNTBypv3SGioiWTWTZdEKNQWv3';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  //guardará el historial de búsqueda del usuario: 
  private _historial: string[] = [];

  //gif es un tipo de dato de gifs.interface:
  public resultados: Gif[]= [];

  get historial(){
    //... operador spread para romper la referencia con historial ()
    return [...this._historial];
  }
  //modulo para hacer peticiones Http (se va a ejecutar solo una vez)
  //es necesario para cargar las imágenes:
  constructor(private http: HttpClient){
    //cargamos el localStorage:
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  //query es la entrada del usuario 
  buscarGifs(query: string){
    query=this.queryToLowerCase(query);
    if(!this.isInHistorial(query)){
      this.addToHistorial(query);
      this.limitHistorial();
      //añadimos el query al localStorage:
      localStorage.setItem('historial',JSON.stringify(this._historial))
    }

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',query);

    //especificamos en el get el tipo, la interfaz:
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp ) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados))
      });
  }
  isInHistorial(query:string){
    let found: boolean =true;
    if(this._historial.includes(query)){
      return found;
    }
    found=false;
    return found;
  }
  limitHistorial(){
    //limitamos el historial a 15:
    this._historial = this._historial.splice(0,14);
  }
  addToHistorial(query:string){
    //se guarda en el primer puesto del historial:
    this._historial.unshift(query);
  }
  queryToLowerCase(query:string){
    return query.trim().toLocaleLowerCase();
  }



}
