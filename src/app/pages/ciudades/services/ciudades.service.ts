import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICiudades } from '../interfaces/ciudades.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  getAllCiudades(): Observable< ICiudades[] > {
    const url: string =  `${this.apiUrl}/ciudades`;
    return this.httpClient.get< ICiudades[]>(url, { headers: this.getHeaders() });
  }

}
