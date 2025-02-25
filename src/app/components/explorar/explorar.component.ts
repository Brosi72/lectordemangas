import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from '../../services/manga-service.service';
import { ModeloMangas, Manga } from '../../models/modelo-mangas';  
import { CommonModule, NgFor } from '@angular/common';
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Importamos Firebase Authentication

@Component({
  selector: 'app-explorar',
  standalone: true,
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css'],
  imports: [CommonModule, NgFor]
})
export class ExplorarComponent implements OnInit {
  mangas: Manga[] = []; 
  currentPage: number = 1;
  totalPages: number = 100; 
  favoritos = JSON.parse(localStorage.getItem('favorites') || '[]');
  selectedManga: any = null;

  constructor(
    private mangaService: MangaService,  
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMangas();
  }

  // Cargar los mangas desde el servicio
  loadMangas() {
    this.mangaService.getAllMangas(this.currentPage).subscribe({
      next: (response) => {
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
    this.selectedManga = manga;  
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.selectedManga = null;
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

  // Lógica para añadir manga a favoritos y guardar en Firestore
  async addToList(manga: Manga) {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (currentUser && currentUser.uid) {
      try {
        // Obtenemos el Firestore y la referencia del documento del usuario
        const db = getFirestore();
        const userRef = doc(db, 'usuarios', currentUser.uid);  // Usamos el UID del usuario

        // Agregamos el manga a la lista de favoritos en Firestore (usando arrayUnion)
        await updateDoc(userRef, {
          favoritos: arrayUnion(manga)  // arrayUnion asegura que el manga no se repita
        });

        console.log('Manga añadido a favoritos en Firestore');

        // Opcionalmente, actualizamos los favoritos en localStorage (solo para tener la UI sincronizada)
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites.find((fav: Manga) => fav.title === manga.title)) {
          favorites.push(manga);
          localStorage.setItem('favorites', JSON.stringify(favorites));
        }
      } catch (error) {
        console.error('Error al añadir manga a favoritos en Firestore:', error);
      }
    } else {
      this.router.navigate(['/login']); // Redirige si no hay usuario logeado
    }
  }
}
