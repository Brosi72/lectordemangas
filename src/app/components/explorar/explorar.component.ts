import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from '../../services/manga-service.service'; // Importamos el servicio
import { ModeloMangas,Manga } from '../../models/modelo-mangas';  // Asegúrate de importar el modelo correcto
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-explorar',
  standalone: true,
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css'],
  imports:[CommonModule,NgFor]
})
export class ExplorarComponent implements OnInit {
  mangas: Manga[] = []; // Usamos Manga, que es el tipo esperado en el array
  currentPage: number = 1;
  totalPages: number = 100; // Este valor puede cambiar si la API te proporciona la información sobre el total de páginas
  favoritos = JSON.parse(localStorage.getItem('favorites') || '[]');
  selectedManga: any = null;
  constructor(
    private mangaService: MangaService,  // Inyectamos el servicio
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMangas();
    
  }

  // Cargar los mangas desde el servicio
  loadMangas() {
    this.mangaService.getAllMangas(this.currentPage).subscribe({
      next: (response) => {
        // Aquí asignamos los datos de la respuesta directamente
        // La respuesta es un objeto ModeloMangas, por lo tanto, accedemos a response.data
        this.mangas = response.data;
        console.log('Mangas cargados:', this.mangas);
      },
      error: (error) => {
        console.error('Error al cargar mangas', error);
      },
    });
  }

  // Cargar siguiente página
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMangas();
    }
  }

  // Cargar página anterior
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMangas();
    }
  }

    // Método para abrir el modal
    openModal(manga: any): void {
      this.selectedManga = manga;  // Asigna el manga seleccionado al modal
    }
  
    // Método para cerrar el modal
    closeModal(): void {
      this.selectedManga = null;  // Establece el valor de selectedManga a null para cerrar el modal
    }
    // Método para obtener la clase según el estado del manga
    getStatusClass(status: string): string {
      switch (status.toLowerCase()) {
        case 'publishing':
          return 'status-publishing';
        case 'on hiatus':
          return 'status-paused';
        case 'finished':
          return 'status-finished';
        case 'abandoned':
          return 'status-abandoned';
        default:
          return 'status-default';
      }
    }
  // Lógica para añadir manga a favoritos
  addToList(manga: Manga) {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (currentUser) {
      let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      console.log(favorites)
      if (!favorites.find((fav: Manga) => fav.title === manga.title)) {
        favorites.push(manga);
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    } else {
      this.router.navigate(['/login']); // Redirige si no hay usuario logeado
    }
  }
}
