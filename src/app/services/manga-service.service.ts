import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, retryWhen, mergeMap, throwError, timer } from 'rxjs';
import { ModeloMangas } from '../models/modelo-mangas';


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
  getMangaGenres(filter: string): Observable<any> {
    let params = new HttpParams().set('filter', filter);
    return this.http.get<any>(`${this.apiUrl}/genres/manga`, { params });
  }

  getMangaDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/manga/${id}`);
  }
}

