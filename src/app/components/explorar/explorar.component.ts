import { Component, OnInit } from '@angular/core';
import { MangaService } from '../../services/manga-service.service';
import { Genre, ModeloMangas } from '../../models/modelo-mangas';// Importa los modelos necesarios
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css'],
  imports: [NgFor,NgIf], // Asegúrate de importar NgFor si no lo has hecho ya
})
export class ExplorarComponent implements OnInit {
  
  genres: Genre[] = []; // Aquí almacenamos los géneros como una lista de objetos de tipo 'Genre'
  
  constructor(private mangaService: MangaService) {}

  ngOnInit(): void {
    // Llamamos al servicio para obtener los géneros de manga
    this.mangaService.getMangaGenres('genres').subscribe({
      next: (response: { data: any[] }) => {
        console.log(response);  // Esto debería mostrar la respuesta correctamente
        this.genres = response.data; // Acceder a 'data' para obtener los géneros
      },
      error: (err) => {
        console.error('Error al obtener los géneros', err);
      },
    });
  }
  
  
  
}
