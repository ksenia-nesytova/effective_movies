import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Movie } from '@app/movies/models/movie';
import { Movies } from '@app/movies/services/movies';
import { MovieCard } from "@app/movies/components/movie-card/movie-card";
import { Search } from '@app/movies/components/movie-search/search';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Loader } from "@app/shared/components/loader/loader";

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard, Loader],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  private readonly moviesService = inject(Movies);
  private readonly searchService = inject(Search);
  private readonly destroyRef = inject(DestroyRef);

  protected isLoading = signal(true);
  protected isFailed = signal(false);

  public movies = signal<Movie[]>([]);

  public filteredMovies = computed(() => {
    const q = this.searchService.query().trim().toLowerCase();
    return this.movies().filter(movie => movie.title.toLowerCase().includes(q));
  });

  constructor() {
    this.loadMovies();
  }

  protected loadMovies(): void {
    this.isLoading.set(true);
    this.isFailed.set(false);

    this.moviesService.getMovies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (movies) => {
          this.movies.set(movies);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error fetching movies:', error);
          this.isFailed.set(true);
          this.isLoading.set(false);
        }
      });
  }
}