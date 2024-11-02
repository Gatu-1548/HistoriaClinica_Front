import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Asegúrate de importar HttpClient
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://backend-historialclinico.onrender.com';  // URL base de tu backend

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
  return this.http.delete<any>(`${this.baseUrl}/auth/especialidades/${id}`);
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
}