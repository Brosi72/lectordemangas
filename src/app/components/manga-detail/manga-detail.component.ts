// manga-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from '../../services/manga-service.service';
import { Manga } from '../../models/modelo-mangas';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-manga-detail',
  templateUrl: './manga-detail.component.html',
  styleUrls: ['./manga-detail.component.css'],
  imports: [NgIf],
})
export class MangaDetailComponent implements OnInit {
  manga: Manga | null = null; // Holds the manga details
  isLoading: boolean = true; // Tracks loading state
  errorMessage: string = ''; // Stores error message if any

  constructor(
    private route: ActivatedRoute,
    private mangaService: MangaService
  ) {}

  ngOnInit(): void {
    // Get the manga ID from the route parameters
    const mangaId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(mangaId)) {
      this.errorMessage = 'Invalid manga ID.';
      this.isLoading = false;
      return;
    }

    // Fetch manga details using the service
    this.mangaService.getDetails(mangaId).subscribe({
      next: (manga) => {
        this.manga = manga;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load manga details.';
        console.error(error);
        this.isLoading = false;
      },
    });
  }
}