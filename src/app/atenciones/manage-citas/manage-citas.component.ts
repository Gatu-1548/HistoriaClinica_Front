import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Cita } from '../../models/citas.model';
import { formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-manage-citas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule
  ],
  templateUrl: './manage-citas.component.html',
  styleUrls: ['./manage-citas.component.css']
})
export class ManageCitasComponent implements OnInit {
  citas: Cita[] = [];
  citasFiltradas: Cita[] = [];
  selectedDate: string | null = null;
  selectedEstado: string | null = 'pendiente';
  isLoading: boolean = false;
  isModalVisible = false; // Controla el modal de detalles de la cita
  isPagoModalVisible = false; // Controla el modal de pagos
  isQrVisible = false; // Controla el modal de QR
  selectedCita: Cita | null = null;

  stripeUrl: string = 'https://buy.stripe.com/test_00g8Af2Imh0p7q8288'; // URL de Stripe

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const today = new Date();
    this.selectedDate = formatDate(today, 'yyyy-MM-dd', 'en');
    this.loadCitas();
  }

  loadCitas() {
    this.isLoading = true;
    this.apiService.getCitas().subscribe(
      (data: Cita[]) => {
        this.citas = data;
        this.filterCitas();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar las citas:', error);
        this.isLoading = false;
      }
    );
  }

  filterCitas() {
    this.citasFiltradas = this.citas.filter((cita) => {
      const matchesDate =
        !this.selectedDate || cita.fecha === this.selectedDate;
      const matchesEstado =
        !this.selectedEstado || cita.estado === this.selectedEstado;
      return matchesDate && matchesEstado;
    });
  }

  viewCitaDetails(cita: Cita) {
    this.selectedCita = cita;
    this.isModalVisible = true;
  }

  handleOk(): void {
    this.isModalVisible = false;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  showPagoModal(): void {
    console.log("Abriendo modal de pagos");
    this.isPagoModalVisible = true;
  }

  handlePagoCancel(): void {
    console.log("Cerrando modal de pagos");
    this.isPagoModalVisible = false;
  }

  redirectToStripe() {
    window.open(this.stripeUrl, '_blank');
  }

  showQrModal(): void {
    this.isQrVisible = true;
  }

  handleQrCancel(): void {
    this.isQrVisible = false;
  }

  cancelarCita(id: number | undefined) {
    if (!id) return;

    if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      this.apiService.cancelarCita(id).subscribe(
        () => {
          alert('Cita cancelada exitosamente.');
          this.loadCitas();
          this.isModalVisible = false;
        },
        (error) => {
          console.error('Error al cancelar la cita:', error);
          alert('Hubo un problema al cancelar la cita.');
        }
      );
    }
  }
  // Método para actualizar el estado de una cita
updateCitaEstado(citaId: number, nuevoEstado: string) {
  this.apiService.updateCitaEstado(citaId, nuevoEstado).subscribe({
    next: (response) => {
      console.log('Estado de la cita actualizado:', response);
      alert('Estado actualizado exitosamente');
      this.loadCitas(); // Recargar la lista de citas
    },
    error: (error) => {
      console.error('Error al actualizar el estado de la cita:', error);
      alert('Hubo un problema al actualizar el estado');
    }
  });
}
}