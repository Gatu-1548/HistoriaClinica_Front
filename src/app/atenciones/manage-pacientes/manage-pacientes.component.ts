import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service'; // Ajusta la ruta si es necesario
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule, NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-manage-pacientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzInputModule,
    NzPaginationModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzMenuModule,
    NzModalModule,
    NzSpinModule,
    NzSelectModule,
    NzRadioModule,
    NzDatePickerModule,
  ],
  providers: [NzMessageService],
  templateUrl: './manage-pacientes.component.html',
  styleUrls: ['./manage-pacientes.component.css'],
})
export class ManagePacientesComponent implements OnInit {
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  total: number = 0;
  antecedentes: any = null;
  isEditModalVisible: boolean = false;
  usuarioEditado: any = {};
  editModalRef: NzModalRef | null = null;
  mostrarConSeguro: boolean = false; // Nueva variable para alternar la vista
  isLoading: boolean = false;

  @ViewChild('antecedentesModalContent', { static: true })
  antecedentesModalContent!: TemplateRef<any>;
  @ViewChild('editUserModalContent', { static: true })
  editUserModalContent!: TemplateRef<any>;

  constructor(
    private apiService: ApiService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  // Nuevo método para alternar entre mostrar todos los usuarios y usuarios con seguro
  toggleUsuariosConSeguro() {
    this.mostrarConSeguro = !this.mostrarConSeguro;
    this.getUsuarios(); // Actualiza la lista según la opción seleccionada
  }

  getUsuarios() {
    this.isLoading = true;
    const obtenerUsuarios = this.mostrarConSeguro
      ? this.apiService.getUsuariosConSeguro() // Llama a usuarios con seguro si mostrarConSeguro es true
      : this.apiService.getUsuarios();         // Llama a todos los usuarios si mostrarConSeguro es false

    obtenerUsuarios.subscribe(
      (data: any) => {
        this.usuarios = data;
        this.filterUsuarios(); // Aplicar filtro inicial
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
        this.isLoading = false;
      }
    );
  }

  // Función de búsqueda
  filterUsuarios() {
    const term = this.searchTerm.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(term) ||
        usuario.ci.toLowerCase().includes(term) ||
        usuario.apellido_paterno.toLowerCase().includes(term)
    );
    this.total = this.usuariosFiltrados.length;
    this.currentPage = 1;
  }

  // Función para manejar el cambio de página
  onPageChange(pageIndex: number) {
    this.currentPage = pageIndex;
  }

  onAntecedentes(usuario: any) {
    this.apiService.getAntecedentesByUserId(usuario.id).subscribe(
      (data) => {
        this.antecedentes = data;
        this.showAntecedentesModal();
      },
      (error) => {
        console.error('Error al cargar antecedentes', error);
        this.antecedentes = null;
        this.showAntecedentesModal();
      }
    );
  }

  showAntecedentesModal() {
    this.modal.create({
      nzTitle: 'Antecedentes del Paciente',
      nzContent: this.antecedentesModalContent,
      nzFooter: null,
      nzWidth: 800,
    });
  }

  onEditar(usuario: any) {
    console.log('Editar usuario:', usuario);
  }

  abrirModalEdicion(usuario: any) {
    this.usuarioEditado = { ...usuario };
    this.editModalRef = this.modal.create({
      nzTitle: 'Editar Usuario',
      nzContent: this.editUserModalContent,
      nzFooter: null,
      nzWidth: 600,
    });
  }
  
  closeEditModal() {
    if (this.editModalRef) {
      this.editModalRef.close();
      this.editModalRef = null;
    }
  }

  // Método para enviar los datos actualizados al backend
  actualizarUsuario() {
    this.isLoading = true;
    const usuarioActualizado = { ...this.usuarioEditado };
    if (usuarioActualizado.fecha_nacimiento) {
      const fecha = new Date(usuarioActualizado.fecha_nacimiento);
      const year = fecha.getFullYear();
      const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
      const day = ('0' + fecha.getDate()).slice(-2);
      usuarioActualizado.fecha_nacimiento = `${year}-${month}-${day}`;
    }
  
    this.apiService.actualizarUsuario(usuarioActualizado.id, usuarioActualizado).subscribe(
      (data) => {
        this.isLoading = false;
        if (this.editModalRef) {
          this.editModalRef.close();
          this.editModalRef = null;
        }
        this.usuarios = this.usuarios.map((user) => user.id === data.id ? data : user);
        this.filterUsuarios();
        this.message.success('Usuario actualizado exitosamente');
      },
      (error) => {
        this.isLoading = false;
        this.message.error('Error al actualizar el usuario');
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }

  disabledDate = (current: Date): boolean => {
    return current && current > new Date();
  };
}
