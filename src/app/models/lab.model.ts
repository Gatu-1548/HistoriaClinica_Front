export interface AnalisisClinico {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface OrdenLaboratorio {
  id: number;
  fechaSolicitud: Date;
  fechaResultado?: Date;
  resultado?: string;
  consultaId: number;
  analisisId: number;
}
