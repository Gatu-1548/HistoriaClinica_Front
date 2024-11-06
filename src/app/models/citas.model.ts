export interface Cita {
    id: number;
    fecha: string;
    horaInicio: string;
    estado: string;
    precio: number;
    user: {
      id: number;
      nombre: string;
      apellido_paterno: string;
      apellido_materno: string;
    };
    medico: {
      id: number;
      user: {
        id: number;
        nombre: string;
        apellido_paterno: string;
        apellido_materno: string;
      };
    };
  }
  