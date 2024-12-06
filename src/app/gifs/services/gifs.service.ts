import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList: Gif[] = [];
  private _tagHistory: string[] = [];
  private api_key: string = 'P4qCWrATyoEyD1ukFDc7urOqcUAmdRZa';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(){
    // return this._tagsHistory;
    // ... hacemos una copia de _tagsHistory
    return [...this._tagHistory]
  }

  private organizeHistory(tag: string) {
    tag.toLowerCase();
    if(this._tagHistory.includes(tag)){
      //Regresa todos los tags menos el repetido
      this._tagHistory =  this._tagHistory.filter( (oldTag) => oldTag !== tag )
    }

    this._tagHistory.unshift(tag);

    // this._tagHistory.splice(0,10) // Este elimina los 10 primeros registros
    this._tagHistory = this._tagHistory.splice(0,10); // Este guarda los 10 registros eliminados

    this.saveLocalStorage();
  }


  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify( this._tagHistory ))
  }

  private loadLocalStorage(): void {

    if( !localStorage.getItem('history') ) return;

    this._tagHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagHistory.length === 0 ) return;
    this.searchAndAddTag(this._tagHistory[0]);
  }

  searchAndAddTag( tag: string): void {
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {

        this.gifList = resp.data;
        console.log({ gifs: this.gifList });
      })
  }
}
