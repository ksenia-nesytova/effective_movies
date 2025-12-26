import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '@app/movies/models/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Movies {
  private readonly apiUrl = 'http://localhost:3000/movies';
  public http = inject(HttpClient);

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

}