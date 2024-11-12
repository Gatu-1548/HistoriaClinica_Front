// manage-atenciones-medico.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Cita } from '../../models/citas.model';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-manage-atenciones-medico',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzSpinModule,
  ],
  templateUrl: './manage-atenciones-medico.component.html',
  styleUrls: ['./manage-atenciones-medico.component.css'],
})
export class ManageAtencionesMedicoComponent implements OnInit {
  citas: Cita[] = [];
  isLoading = false;
  medicoUserId?: number;

  constructor(private apiService: ApiService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.obtenerMedicoUserId();
    this.loadCitas();
  }

  obtenerMedicoUserId() {
    // Recuperar los datos del usuario directamente de Session Storage
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.medicoUserId = user.id;

    if (!this.medicoUserId) {
      this.message.error('No se pudo obtener el ID del médico. Por favor, inicia sesión nuevamente.');
    }
  }

  loadCitas() {
    if (!this.medicoUserId) return;

    this.isLoading = true;
    this.apiService.getCitasByMedicoUserId(this.medicoUserId).subscribe(
      (data: Cita[]) => {
        this.citas = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar las citas del médico:', error);
        this.message.error('Error al cargar las citas.');
        this.isLoading = false;
      }
    );
  }
}
