import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Peticion } from './peticion';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http: HttpClient) { }

  index(peticion: Peticion): Observable<any> {
    return this.http.get('http://');
    
    }

    create(peticion: Peticion): Observable<any> {
      return this.http.post('http://127.0.0.1:8000/api/peticiones', peticion);
      
      }

      edit (peticion: Peticion): Observable<any> {
        return this.http.post('http://',peticion);
        
        }
}
