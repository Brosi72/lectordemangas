// navbar.component.ts
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [NgIf,NgFor],
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;  // Variable que indica si el usuario está logueado
  dropdownOpen: boolean = false;  // Variable para controlar la visibilidad del dropdown

  ngOnInit(): void {
    // Verificar si el usuario está logueado
    const user = localStorage.getItem('user');
    if (user) {
      this.isLoggedIn = true;  // Si existe el usuario en LocalStorage, se marca como logueado
    }
  }

  toggleDropdown(event: MouseEvent) {
    // Detener la propagación del evento click para evitar el cierre del dropdown accidentalmente
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    // Método para cerrar el dropdown si el usuario hace clic fuera
    this.dropdownOpen = false;
  }

  logout() {
    // Eliminar al usuario del LocalStorage y marcarlo como no logueado
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    // Redirigir al login después de cerrar sesión
    window.location.reload();  // Recargar la página para reflejar los cambios en el navbar
  }
}
