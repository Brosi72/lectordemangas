import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor() { }

  // Método para loguear al usuario y guardar en localStorage
  loginUser(user: any): void {
    // Guardar el usuario en localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Método para obtener el usuario actual desde localStorage
  getCurrentUser(): any {
    // Recuperar el usuario desde localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      return JSON.parse(user);
    }
    return null; // Si no hay usuario logueado, devuelve null
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null; // Si hay un usuario en localStorage, está logueado
  }

  // Método para cerrar sesión y eliminar el usuario de localStorage
  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
