import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-solicitar-analisis',
  standalone: true,
  imports: [FormsModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule,
    CommonModule 
  ],
  templateUrl: './solicitar-analisis.component.html',
  styleUrl: './solicitar-analisis.component.css'
})
export class SolicitarAnalisisComponent  implements OnInit {
  @Input() consultaId!: number;
  analisisClinicoList: any[] = [];
  analisisForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.analisisForm = this.fb.group({
      analisisIds: [[]]  // Campo para almacenar múltiples análisis seleccionados
    });
  }

  ngOnInit(): void {
    this.cargarAnalisisClinico();
  }

  cargarAnalisisClinico() {
    this.apiService.getAnalisisClinico().subscribe(
      (data) => {
        this.analisisClinicoList = data;
      },
      (error) => {
        console.error('Error al cargar tipos de análisis clínico:', error);
      }
    );
  }

  solicitarAnalisis() {
    const analisisIds = this.analisisForm.value.analisisIds;
    analisisIds.forEach((analisisId: number) => {
      const ordenData = {
        consultaId: this.consultaId,
        analisisId: analisisId,
        fechaSolicitud: new Date()
      };
      console.log(ordenData)
      this.apiService.createOrdenLaboratorio(ordenData).subscribe(
        () => this.message.success('Análisis solicitado correctamente.'),
        (error) => this.message.error('Error al solicitar el análisis.')
      );
    });
  }
}
