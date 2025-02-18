import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MangaService } from '../../services/manga-service.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [NgFor, NgIf, NgClass],
  styleUrls: ['./main.component.css']
})

  export class MainComponent implements OnInit, AfterViewInit {

    topMangas: any[] = [];
    selectedManga: any = null; // Para almacenar el manga seleccionado y mostrarlo en el modal
  
    constructor(private mangaService: MangaService, private router: Router) {}
  
    ngOnInit(): void {
      // Verifica si el usuario está logueado
      const user = localStorage.getItem('user');
      const loginCompleted = localStorage.getItem('loginCompleted');
      
      if (user && loginCompleted) {
        // Si el usuario está logueado y la bandera 'loginCompleted' está activa
        // Recarga la página solo una vez
        setTimeout(() => {
          window.location.reload();
        }, 10); // 1000 ms = 1 segundo
  
        // Elimina la bandera 'loginCompleted' para evitar futuras recargas
        localStorage.removeItem('loginCompleted');
      } 
  
      // Obtén los mangas top desde el servicio
      this.mangaService.getTopMangas().subscribe(
        (response) => {
          this.topMangas = response.data.slice(0, 10);  // Obtén solo los primeros 10 mangas
        },
        (error) => {
          console.error('Error fetching manga data:', error);
        }
      );
    }
  
    ngAfterViewInit(): void {
      // Agregar clase para animar las tarjetas después de que la vista se haya renderizado
      setTimeout(() => {
        const mangaItems = document.querySelectorAll('.manga-item');
        mangaItems.forEach((item, index) => {
          item.classList.add('animate');
        });
      }, 100);
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
  }