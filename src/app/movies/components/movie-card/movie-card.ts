import { Component, computed, inject, input, InputSignal, } from '@angular/core';
import { Movie } from '@app/movies/models/movie';
import { NgOptimizedImage } from "@angular/common";
import { Router } from '@angular/router';

const DEFAULT_IMAGE = 'assets/movies/USS_Enterprise.png';

@Component({
  selector: 'app-movie-card',
  imports: [NgOptimizedImage],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  private readonly router = inject(Router);

  public movie: InputSignal<Movie | null> = input<Movie | null>(null);
  protected coverImage = computed(() =>
    this.movie()?.coverImage ?? DEFAULT_IMAGE
  );

  protected showDetails(): void {
    const id = this.movie()?.id;
    if (id) {
      this.router.navigate(['/movies', id]);
    }
  }
}