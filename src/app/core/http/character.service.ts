import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Md5 } from 'ts-md5';

import { environment } from './../../../environments/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  hash: string = '';

  timeStamp = new Date().getTime();

  PRIV_KEY = environment.PRIV_KEY;
  API_KEY = environment.API_KEY;
  API_URL = environment.API_URL;
  CHARACTERS_URL = environment.CHARACTERS_URL;
  BASE_URL = `${this.API_URL}${this.CHARACTERS_URL}`;


  constructor(private httpClient: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}?ts=${this.timeStamp}&apikey=${this.API_KEY}&hash=${this.getHashValue}`);
  }

  get getHashValue() {
    return Md5.hashStr(this.timeStamp + this.PRIV_KEY + this.API_KEY);
  }

  get baseUrl() {
    return this.API_URL + this.CHARACTERS_URL;
  }

}
