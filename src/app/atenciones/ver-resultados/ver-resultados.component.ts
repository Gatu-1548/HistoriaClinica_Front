import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ver-resultados',
  standalone: true,
  imports: [CommonModule
  ],
  templateUrl: './ver-resultados.component.html',
  styleUrl: './ver-resultados.component.css',
})
export class VerResultadosComponent implements OnInit {
  @Input() consultaId!: number;
  ordenes: any[] = [];

  constructor(
    private apiService: ApiService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.cargarResultados();
  }

  cargarResultados() {
    this.apiService.getOrdenesPorConsulta(this.consultaId).subscribe(
      (data) => {
        this.ordenes = data;
      },
      (error) => {
        console.error('Error al cargar resultados de laboratorio:', error);
      }
    );
  }

  registrarResultado(
    ordenId: number,
    resultados: string[],
    observaciones: string
  ) {
    this.apiService
      .registrarResultadosOrden(ordenId, resultados, observaciones)
      .subscribe(
        () => this.message.success('Resultado registrado correctamente.'),
        (error) => this.message.error('Error al registrar el resultado.')
      );
  }
}
