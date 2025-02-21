import { Component, OnInit } from '@angular/core';
import { MangaService } from '../../services/manga-service.service'; 
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-manga-random',
  templateUrl: './manga-random.component.html',
  styleUrls: ['./manga-random.component.css'],
  imports:[NgIf,NgFor,CommonModule],
})
export class MangaRandomComponent implements OnInit {
  manga: any = null;
  errorMessage: string = '';

  constructor(private mangaService: MangaService) {}

  ngOnInit() {
    // Obtener un manga aleatorio al cargar la página
    this.getRandomManga();
  }

  getRandomManga() {
    this.mangaService.getRandomManga().subscribe(
      (response: any) => {
        this.manga = response.data;
        this.errorMessage = '';
      },
      (error) => {
        this.manga = null;
        this.errorMessage = 'No se pudo obtener un manga aleatorio. Intenta de nuevo.';
      }
    );
  }
}
