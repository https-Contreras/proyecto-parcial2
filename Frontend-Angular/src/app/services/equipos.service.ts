import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/equipos/`;

  getEquipos(): Observable<any> {
    return this.http.get(this.apiUrl+'listar');
  }

  getEquipoById(id: number): Observable<any> {
    return this.http.get(this.apiUrl+id);
  }

  createEquipo(equipo: any): Observable<any> {
    return this.http.post(this.apiUrl+"crear", equipo);
  }

  updateEquipo(id: number, equipo: any): Observable<any> {
    return this.http.put(this.apiUrl+ "actualizar/" + id, equipo);
  }

  deleteEquipo(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+ "eliminar/" + id);
  }
}
