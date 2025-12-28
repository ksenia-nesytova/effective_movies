import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '@app/movies/models/movie';
import { Movies } from '@app/movies/services/movies';
import { NgOptimizedImage } from "@angular/common";
import { Loader } from "@app/shared/components/loader/loader";

const DEFAULT_IMAGE = 'assets/movies/USS_Enterprise.png';

@Component({
  selector: 'app-movie-details',
  imports: [NgOptimizedImage, Loader],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
})
export class MovieDetails {
  private readonly moviesService = inject(Movies);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  protected isLoading = signal(true);
  protected isFailed = signal(false);

  protected movie = signal<Movie | null>(null);
  protected coverImage = computed(() =>
    this.movie()?.coverImage ?? DEFAULT_IMAGE
  );

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadMovie(id);
    } else {
      this.isFailed.set(true);
      this.isLoading.set(false);
    }
  }

  protected loadMovie(id: string): void {
    this.isFailed.set(false);
    this.isLoading.set(true);

    this.moviesService.getMovieById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (movie) => {
          this.movie.set(movie);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error fetching movie details:', error);
          this.isFailed.set(true);
          this.isLoading.set(false);
        }
      });
  }
}
