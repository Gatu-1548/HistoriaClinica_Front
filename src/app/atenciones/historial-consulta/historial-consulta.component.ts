import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-historial-consulta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzTableModule,
    NzSpinModule,
  ],
  templateUrl: './historial-consulta.component.html',
  styleUrl: './historial-consulta.component.css',
})
export class HistorialConsultaComponent implements OnInit {
  @Input() pacienteId!: number;

  antecedentes: any = null;
  // triajes: any[] = [];
  triajes: any = null;
  consultasDiagnosticos: any[] = [];
  recetasConConsulta: any[] = [];

  isLoadingAntecedentes = false;
  isLoadingTriajes = false;
  isLoadingDiagnosticos = false;
  isLoadingRecetas = false;

  showAntecedentes = false;
  showTriajes = false;
  showDiagnosticos = false;
  showRecetas = false;

  seccionesVisibles: { [key: string]: boolean } = {
    antecedentes: false,
    triajes: false,
    diagnosticos: false,
    recetas: false,
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  // cargarHistorial() {
  //   // this.apiService.getAntecedentes(this.pacienteId).subscribe(data => this.antecedentes = data);
  //   this.apiService.getAntecedentesByUserId(this.pacienteId).subscribe(
  //     (data) => {
  //       this.antecedentes = data; // Asigna los datos de antecedentes a la variable
  //       console.log('Datos de antecedentes:', this.antecedentes); // Verifica los datos aquí
  //     },
  //     (error) => {
  //       console.error('Error al cargar antecedentes', error);

  //     }
  //   );
  //  // this.apiService.getTriajes(this.pacienteId).subscribe(data => this.triajes = data);
  //  // this.apiService.getDiagnosticos(this.pacienteId).subscribe(data => this.diagnosticos = data);
  //  // this.apiService.getRecetas(this.pacienteId).subscribe(data => this.recetas = data);
  // }

  toggleSection(section: string) {
    if (!this.seccionesVisibles[section]) {
      this.seccionesVisibles[section] = true;

      switch (section) {
        case 'antecedentes':
          this.isLoadingAntecedentes = true;
          console.log(this.pacienteId);
          this.apiService.getAntecedentesByUserId(this.pacienteId).subscribe(
            (data) => {
              this.antecedentes = data;
              console.log('Datos de antecedentes:', this.antecedentes);
              this.isLoadingAntecedentes = false;
            },
            (error) => {
              console.error('Error al cargar antecedentes', error);
              this.isLoadingAntecedentes = false;
            }
          );
          break;

        case 'triajes':
          this.isLoadingTriajes = true;
          this.apiService.getTriajes(this.pacienteId).subscribe(
            (data) => {
              this.triajes = data;
              console.log(this.triajes);
              this.isLoadingTriajes = false;
            },
            (error) => {
              console.error('Error al cargar triajes', error);
              this.isLoadingTriajes = false;
            }
          );
          break;

        case 'diagnosticos':
          this.isLoadingDiagnosticos = true;
          this.apiService
            .getConsultasConDiagnosticos(this.pacienteId)
            .subscribe(
              (data) => {
                this.consultasDiagnosticos = data;
                this.isLoadingDiagnosticos = false;
              },
              (error) => {
                console.error(
                  'Error al cargar consultas con diagnósticos:',
                  error
                );
                this.isLoadingDiagnosticos = false;
              }
            );
          break;

        case 'recetas':
          this.isLoadingRecetas = true;
          this.apiService.getRecetasConConsulta(this.pacienteId).subscribe(
            (data) => {
              this.recetasConConsulta = data;
              this.isLoadingRecetas = false;
            },
            (error) => {
              console.error('Error al cargar recetas con consulta:', error);
              this.isLoadingRecetas = false;
            }
          );
          break;
      }
    } else {
      this.seccionesVisibles[section] = !this.seccionesVisibles[section];
    }
  }

  // trackById(index: number, item: any): any {
  //   return item.id || index; // Usa `item.id` si existe, de lo contrario usa el índice.
  // }
}
