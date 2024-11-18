import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestor-analisis',
  standalone: true,
  imports: [
    FormsModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule,
    CommonModule
  ],
  templateUrl: './gestor-analisis.component.html',
  styleUrl: './gestor-analisis.component.css'
})
export class GestorAnalisisComponent implements OnInit{
  @Input() consultaId!: number;
  ordenes: any[] = [];
  resultadoNuevo: string = '';
  resultados: string[] = []; 
  observacionesNuevas: string = '';

  constructor(
    private apiService: ApiService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes() {
    this.apiService.getOrdenesPorConsulta(this.consultaId).subscribe(
      (data) => {
        this.ordenes = data;
      },
      (error) => {
        console.error('Error al cargar las órdenes de laboratorio:', error);
        this.message.error('Error al cargar las órdenes de laboratorio.');
      }
    );
  }
  onFilesSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.resultados.push(reader.result as string); // Agrega cada imagen en Base64
        };
        reader.readAsDataURL(file); // Convierte cada archivo a Base64
      });
    }
  }



  agregarResultados(ordenId: number) {
    this.apiService.registrarResultadosOrden(ordenId, this.resultados, this.observacionesNuevas).subscribe(
      () => {
        this.message.success('Resultados registrados correctamente.');
        this.cargarOrdenes(); // Recargar la lista para actualizar los resultados
        this.resultados = []; // Limpiar la lista después de enviar
        this.observacionesNuevas = '';
      },
      (error) => {
        console.error('Error al registrar los resultados:', error);
        this.message.error('Error al registrar los resultados.');
      }
    );
  }
  
}
