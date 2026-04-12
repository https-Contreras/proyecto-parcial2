import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  
  // Simulación de envío de reporte (API dummy)
  enviarReporte(reporte: any): Observable<any> {
    console.log('Enviando reporte al servidor...', reporte);
    // Usamos of() de RxJS para simular una respuesta exitosa con delay de 1 segundo
    return of({ status: 'success', message: 'Reporte registrado exitosamente' }).pipe(delay(1000));
  }
}
