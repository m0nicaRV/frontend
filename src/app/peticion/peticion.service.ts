import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Peticion } from './peticion';

@Injectable({
  providedIn: 'root',
})
export class PeticionService {
  constructor(private http: HttpClient) {}

  index(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/peticiones');
  }

  create(peticion: FormData): Observable<any> {
    const headers= new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post('http://127.0.0.1:8000/api/peticiones', peticion,( {headers: headers}));
  }

  show(id: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/peticiones/${id}`);

  }

  myPeticiones(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/mispeticiones')
  }

  firmar(id: string): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/peticiones/firmar/${id}`, {});
  }
}
