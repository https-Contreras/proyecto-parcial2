import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/empleados`;

  getEmpleados(): Observable<any> {
    return this.http.get(this.apiUrl+'/listar');
  }

  getEmpleadoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/detalle/${id}`);
  }

  createEmpleado(empleado: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, empleado);
  }

  updateEmpleado(id: number, empleado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar/${id}`, empleado);
  }

  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }
}
