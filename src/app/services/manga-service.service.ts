import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, retryWhen, mergeMap, throwError, timer, map, tap } from 'rxjs';
import {  Manga, ModeloMangas } from '../models/modelo-mangas';


@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private apiUrl = 'https://api.jikan.moe/v4';

  constructor(private http: HttpClient) {}

  getTopMangas(): Observable<{ data: ModeloMangas[] }> {
    const url = `${this.apiUrl}/top/manga`;

    return this.http.get<{ data: ModeloMangas[] }>(url).pipe(
      retryWhen((errors) =>
        errors.pipe(
          mergeMap((error) => {
            if (error.status === 429) {
              return timer(500);
            }
            return throwError(() => error);
          })
        )
      ),
    );
  }
  
  getDetails(mangaId: number): Observable<Manga> {
    const url = `${this.apiUrl}/manga/${mangaId}`;
    return this.http.get<{ data: Manga }>(url).pipe(
      map((response) => response.data), // Extract the 'data' field from the response
      retryWhen((errors) =>
        errors.pipe(
          mergeMap((error) => {
            if (error.status === 429) {
              return timer(500); // Retry after 500ms on rate limit error
            }
            return throwError(() => error);
          })
        )
      )
    );
  }
  getAllMangas(page: number = 1): Observable<ModeloMangas> {
    const url = `${this.apiUrl}/manga?page=${page}`;
    return this.http.get<ModeloMangas>(url); // Asegúrate de que el tipo es ModeloMangas
  }
  getRandomManga(): Observable<ModeloMangas> {
    const url = `${this.apiUrl}/random/manga?swf`;  // URL correcta para obtener un manga aleatorio
    return this.http.get<ModeloMangas>(url);
  }
  getMangaSearch(query: string): Observable<{ data: ModeloMangas[] }> {
    const url = `${this.apiUrl}/manga?q=${query}&sfw=true`;  // Realizar búsqueda con filtro SFW
    return this.http.get<{ data: ModeloMangas[] }>(url);
  }





  

}

