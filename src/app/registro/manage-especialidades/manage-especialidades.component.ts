import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-especialidades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-especialidades.component.html',
  styleUrls: ['./manage-especialidades.component.css']
})
export class ManageEspecialidadesComponent implements OnInit {
  especialidades: any[] = [];
  especialidadesPaginadas: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  editedEspecialidad: any = null;
  editEspecialidadName: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadEspecialidades();
  }

  loadEspecialidades() {
    this.apiService.getEspecialidades().subscribe((data) => {
      this.especialidades = data;
      this.paginateEspecialidades();
    });
  }

  filterEspecialidades() {
    const filtered = this.especialidades.filter(especialidad =>
      especialidad.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.paginateEspecialidades(filtered);
  }

  paginateEspecialidades(data = this.especialidades) {
    this.totalPages = Math.ceil(data.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    this.especialidadesPaginadas = data.slice(start, start + this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateEspecialidades();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateEspecialidades();
    }
  }

  createEspecialidad() {
    const newEspecialidad = { nombre: this.editEspecialidadName };
    this.apiService.createEspecialidad(newEspecialidad).subscribe(() => {
      this.loadEspecialidades();
      this.editEspecialidadName = '';
    });
  }

  editEspecialidad(especialidad: any) {
    this.editedEspecialidad = especialidad;
    this.editEspecialidadName = especialidad.nombre;
  }

  saveEspecialidad() {
    if (this.editedEspecialidad) {
      const updatedEspecialidad = { nombre: this.editEspecialidadName };
      this.apiService.updateEspecialidad(this.editedEspecialidad.id, updatedEspecialidad).subscribe(() => {
        this.loadEspecialidades();
        this.cancelEdit();
      });
    }
  }

  cancelEdit() {
    this.editedEspecialidad = null;
    this.editEspecialidadName = '';
  }

  deleteEspecialidad(id: number) {
    this.apiService.deleteEspecialidad(id).subscribe(() => {
      this.loadEspecialidades();
    });
  }
}