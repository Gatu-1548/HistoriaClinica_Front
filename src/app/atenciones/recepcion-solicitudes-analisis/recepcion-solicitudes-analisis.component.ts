import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-recepcion-solicitudes-analisis',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule,
  ],
  templateUrl: './recepcion-solicitudes-analisis.component.html',
  styleUrl: './recepcion-solicitudes-analisis.component.css',
})
export class RecepcionSolicitudesAnalisisComponent  implements OnInit {
  ordenesPendientes: any[] = []; // Lista de órdenes de laboratorio pendientes
  selectedOrden: any = null; // Orden seleccionada para agregar resultados
  resultados: string[] = []; // Lista de imágenes en Base64 para un análisis
  observacionesNuevas: string = ''; // Observaciones adicionales
  previewUrls: string[] = [];
  
  constructor(
    private apiService: ApiService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.cargarOrdenesPendientes();
  }

  // Cargar todas las órdenes pendientes
  cargarOrdenesPendientes() {
    this.apiService.getOrdenesPendientes().subscribe(
      (data) => {
        this.ordenesPendientes = data;
      },
      (error) => {
        console.error('Error al cargar órdenes de laboratorio pendientes:', error);
        this.message.error('Error al cargar las órdenes de laboratorio pendientes.');
      }
    );
  }

  seleccionarOrden(orden: any) {
    this.selectedOrden = orden;
    this.resultados = []; // Limpiar los resultados previos
    this.observacionesNuevas = ''; // Limpiar las observaciones previas
    this.previewUrls = [];
  }

  // Selección de múltiples archivos y conversión a Base64
  onFilesSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          this.resultados.push(base64String); // Agregar a la lista de resultados
          this.previewUrls.push(base64String); // Agregar a la lista de previsualización
        };
        reader.readAsDataURL(file); // Convertir el archivo a Base64
      });
    }
  }

  quitarImagen(index: number) {
    this.resultados.splice(index, 1); // Eliminar de la lista de resultados
    this.previewUrls.splice(index, 1); // Eliminar de la lista de previsualización
  }
  
  // Método para registrar resultados de una orden específica
  agregarResultados() {
    if (!this.selectedOrden) return;

    this.apiService.registrarResultadosOrden(this.selectedOrden.id, this.resultados, this.observacionesNuevas).subscribe(
      () => {
        this.message.success('Resultados registrados correctamente.');
        this.selectedOrden = null;
        this.cargarOrdenesPendientes();
        this.resultados = [];
        this.previewUrls = []; // Limpiar la vista previa después de guardar
      },
      (error) => {
        console.error('Error al registrar los resultados:', error);
        this.message.error('Error al registrar los resultados.');
      }
    );
  }
}
