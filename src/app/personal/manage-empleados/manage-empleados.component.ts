import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importar módulos de NG-ZORRO
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-manage-empleados',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzPaginationModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzIconModule,
    NzSelectModule,
    NzDatePickerModule
  ],
  templateUrl: './manage-empleados.component.html',
  styleUrls: ['./manage-empleados.component.css']
})
export class ManageEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  empleadosPaginados: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  editedEmpleado: any = null;
  isModalOpen = false;
  isEditing = false;

  editEmpleadoData: any = {
    estado: '',
    fechaContratacion: null,
    user: {
      ci: '',
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      telefono: '',
      email: ''
    },
    especialidades: []
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadEmpleados();
  }

  loadEmpleados() {
    this.apiService.getEmpleados().subscribe((data) => {
      this.empleados = data;
      this.totalItems = data.length;
      this.paginateEmpleados();
    });
  }

  filterEmpleados() {
    const filtered = this.empleados.filter(empleado =>
      empleado.user.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalItems = filtered.length;
    this.currentPage = 1;
    this.paginateEmpleados(filtered);
  }

  paginateEmpleados(data = this.empleados) {
    const start = (this.currentPage - 1) * this.pageSize;
    this.empleadosPaginados = data.slice(start, start + this.pageSize);
  }

  onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.paginateEmpleados();
  }

  openModal(isEditing = false, empleado: any = null) {
    this.isModalOpen = true;
    this.isEditing = isEditing;
    if (isEditing && empleado) {
      this.editedEmpleado = empleado;
      this.editEmpleadoData.estado = empleado.estado;
      this.editEmpleadoData.fechaContratacion = empleado.fechaContratacion;
      this.editEmpleadoData.user = {
        ci: empleado.user.ci,
        nombre: empleado.user.nombre,
        apellido_paterno: empleado.user.apellido_paterno,
        apellido_materno: empleado.user.apellido_materno,
        telefono: empleado.user.telefono,
        email: empleado.user.email
      };
    } else {
      this.resetForm();
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  createEmpleado() {
    this.apiService.createEmpleado(this.editEmpleadoData).subscribe(() => {
      this.loadEmpleados();
      this.closeModal();
    });
  }

  saveEmpleado() {
    if (this.editedEmpleado) {
      this.apiService.updateEmpleado(this.editedEmpleado.id, this.editEmpleadoData).subscribe(() => {
        this.loadEmpleados();
        this.closeModal();
      });
    }
  }

  resetForm() {
    this.editedEmpleado = null;
    this.editEmpleadoData = {
      estado: '',
      fechaContratacion: null,
      user: {
        ci: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        telefono: '',
        email: ''
      },
      especialidades: []
    };
  }

  autoFillForm(ci: string) {
    const empleado = this.empleados.find((emp: any) => emp.user.ci === ci);
    if (empleado) {
      this.apiService.getEmpleadoById(empleado.id).subscribe((data: any) => {
        this.editEmpleadoData.user = {
          ci: data.user.ci,
          nombre: data.user.nombre,
          apellido_paterno: data.user.apellido_paterno,
          apellido_materno: data.user.apellido_materno,
          telefono: data.user.telefono,
          email: data.user.username
        };
        this.editEmpleadoData.fechaContratacion = data.fechaContratacion;
        this.editEmpleadoData.estado = data.estado;
        this.editEmpleadoData.especialidades = data.especialidades.map((e: any) => e.id);
      }, (error: any) => {
        console.error("No se pudo obtener el empleado", error);
      });
    }
  }
}
