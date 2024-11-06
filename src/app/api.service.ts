import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';  // Asegúrate de importar HttpClient
import { Observable,from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'; // Corrige el import de jwtDecode
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://backend-historialclinico.onrender.com';  // URL base de tu backend
  // private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }  // Asegúrate de que HttpClient sea parte del constructor

  // Método para registrar usuario
  register(userData: any): Observable<any> {
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post(url, userData);
  }

  // Método para login
login(credentials: any): Observable<any> {
  const url = `${this.baseUrl}/auth/login`;
  return this.http.post(url, credentials).pipe(
    tap((response: any) => {
      // Almacena el token en localStorage si la autenticación es exitosa
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
    })
  );
}

// Método para obtener los datos completos del usuario por su username
getUserByUsername(username: string): Observable<any> {
  const url = `${this.baseUrl}/auth/getUserByUsername`;
  const token = localStorage.getItem('token') || ''; // Usar el token almacenado para autenticación
  return this.http.post(url, { username }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}


  // Método para obtener usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/users`);
  }

// Obtener roles
getRoles(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/auth/roles`);
}

// Crear un rol
createRole(rol: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/auth/roles`, rol);
}

// Editar un rol
updateRole(id: number, rol: any): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/auth/roles/${id}`, rol);
}

// Eliminar un rol
deleteRole(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/auth/roles/${id}`);
}

getEspecialidades(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/auth/especialidades`);
}

createEspecialidad(especialidad: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/auth/especialidades/crear`, especialidad);
}

updateEspecialidad(id: number, especialidad: any): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/auth/especialidades/${id}`, especialidad);
}

deleteEspecialidad(id: number): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/auth/especialidades/eliminar/${id}`);
}

// Obtener lista de empleados
getEmpleados(): Observable<any> {
  return this.http.get(`${this.baseUrl}/auth/medicos`);
}

// Crear un nuevo empleado
createEmpleado(empleadoData: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/auth/medicos/crear`, empleadoData);
}

// Editar un empleado
updateEmpleado(id: number, empleadoData: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/auth/medicos/editar/${id}?rolId=${empleadoData.rolId}`, empleadoData);
}

// Método para obtener un médico por ID
getEmpleadoById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/auth/medicos/${id}`);
}




// Obtener lista de permisos
getPermissions(): Observable<any> {
  return this.http.get(`${this.baseUrl}/auth/permisos`);
}

// Obtener permisos por rol ID
getRolePermissions(roleId: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/auth/roles/${roleId}`);
}

// Actualizar permisos del rol
updateRolePermissions(roleId: number, permissionsData: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/auth/roles/editar/${roleId}`, permissionsData);
}

 // API para listar departamentos
 getDepartamentos(): Observable<any> {
  return this.http.get(`${this.baseUrl}/auth/departamentos`);
}

// API para obtener un departamento por ID
getDepartamentoById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/auth/departamentos/${id}`);
}

// API para crear un nuevo departamento
createDepartamento(departamentoData: any): Observable<any> {
  const url = `${this.baseUrl}/auth/departamentos/crear`;
  const token = localStorage.getItem('token') || ''; // Token almacenado en localStorage
  return this.http.post(url, departamentoData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}
// API para actualizar un departamento
updateDepartamento(id: number, departamento: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/auth/departamentos/actualizar/${id}`, departamento);
}

// API para eliminar un departamento
deleteDepartamento(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/auth/departamentos/eliminar/${id}`);
}

 // Crear un nuevo servicio
 createServicio(servicioData: any): Observable<any> {
  const url = `${this.baseUrl}/auth/servicios/crear`;
  const token = localStorage.getItem('token') || '';  // Token almacenado en localStorage
  return this.http.post(url, servicioData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

// Obtener un servicio por ID
getServicioById(id: number): Observable<any> {
  const url = `${this.baseUrl}/auth/servicios/obtener/${id}`;
  return this.http.get(url);
}

// Listar todos los servicios
getServicios(): Observable<any> {
  const url = `${this.baseUrl}/auth/servicios`;
  return this.http.get(url);
}

// Editar un servicio existente
updateServicio(id: number, servicioData: any): Observable<any> {
  const url = `${this.baseUrl}/auth/servicios/editar/${id}`;
  const token = localStorage.getItem('token') || '';  // Token almacenado en localStorage
  return this.http.put(url, servicioData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

// Eliminar un servicio por ID
deleteServicio(id: number): Observable<any> {
  const url = `${this.baseUrl}/auth/servicios/eliminar/${id}`;
  const token = localStorage.getItem('token') || '';  // Token almacenado en localStorage
  return this.http.delete(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}
 // Método para obtener los registros de la bitácora
 getBitacora(): Observable<any> {
  return this.http.get(`${this.baseUrl}/auth/bitacora`);
}

 // Método para registrar una acción en la bitácora
 registrarBitacora(accion: string, tablaAfectada: string): Observable<any> {
  // Llama a obtenerIP y obtenerCIDelUsuario para obtener los valores dinámicos
  return from(
    this.obtenerIP().then(ip => {
      const ci = this.obtenerCIDelUsuario();
      const bitacora = { ip, ci, accion, tablaAfectada };
      return this.http.post(`${this.baseUrl}/auth/bitacora/registrar`, bitacora).toPromise();
    })
  );
}

async obtenerIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');  // Servicio público de IP
    const data = await response.json();
    return data.ip;  // Retorna la IP obtenida
  } catch (error) {
    console.error('Error al obtener la IP:', error);
    return '255.255.255.255';  // Retorna una IP por defecto si no se puede obtener la real
  }
}
obtenerCIDelUsuario(): string {
  const token = JSON.parse(sessionStorage.getItem('user')|| '{}');
  if (token) {
    try {
      
      console.log('Contenido del token decodificado:', token); // Agrega esto para ver los datos del token
      return token.ci || 'Desconocido'; // Cambia 'ci' por el campo correcto después de verificar
    } catch (error) {
      console.error('Error al decodificar el token', error);
    }
  }
  return 'Desconocido';
}
}


