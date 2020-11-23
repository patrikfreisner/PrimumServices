import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    public http: HttpClient
  ) { }

  getCepInfo(cep: string): Observable<any> {
    return this.http.get("https://viacep.com.br/ws/" + cep + "/json");
  }

  getBrazilCountry(): Observable<any> {
    return this.http.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/");
  }

  getStateCity(state: string): Observable<any> {
    return this.http.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + state + "/distritos");
  }
}
