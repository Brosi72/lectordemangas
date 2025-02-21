import { Component, OnInit } from '@angular/core';
import { MangaService} from '../../services/manga-service.service';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Manga, ModeloMangas } from '../../models/modelo-mangas';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports:[CommonModule,NgIf,NgFor,RouterOutlet,FormsModule],
  standalone: true,
  providers: [MangaService,],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  dropdownOpen: boolean = false;
  searchQuery: string = ''; // Propiedad que guarda la consulta de búsqueda
  searchResults: any[] = []; // Resultados de la búsqueda
  errorMessage: string = ''; // Mensaje de error si no se encuentran resultados
  loading: boolean = false;  // Indicador de carga

 
    ngOnInit(): void {
      // Verificar si el usuario está logueado
      const user = localStorage.getItem('user');
      if (user) {
        this.isLoggedIn = true;
      }
    }
  
    // Función que maneja el cambio de estado del dropdown
    toggleDropdown(event: MouseEvent) {
      event.stopPropagation();
      this.dropdownOpen = !this.dropdownOpen;
    }
  
    // Cerrar el dropdown si el usuario hace clic fuera
    closeDropdown() {
      this.dropdownOpen = false;
    }
  
    // Función de logout
    logout() {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      window.location.reload();  // Recargar la página para reflejar los cambios
    }
  
    // Función de búsqueda
    onSearch(): void {
      if (this.searchQuery.length > 2) {
        // Realizar la búsqueda solo si el texto tiene más de 2 caracteres
        this.mangaService.getMangaSearch(this.searchQuery).subscribe({
          next: (results) => {
            this.searchResults = results.data; // Almacenar los resultados de búsqueda
          },
          error: (err) => {
            console.error('Error en la búsqueda', err);
          },
        });
      } else {
        this.searchResults = []; // Limpiar los resultados si la búsqueda tiene menos de 3 caracteres
      }
    }
  
    // Redirigir al detalle del manga
    selectManga(manga: Manga): void {
      // Option 1: Use window.location.href for a full page reload
      window.location.href = `/manga-detail/${manga.mal_id}`;}
  
    constructor(private mangaService: MangaService, private router: Router) {}
  }