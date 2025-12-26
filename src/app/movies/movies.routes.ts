import { Routes } from '@angular/router';
import { MovieList } from './pages/movie-list/movie-list';
import { MovieDetails } from './components/movie-details/movie-details';

export const moviesRoutes: Routes = [
  {
    path: '',
    component: MovieList
  },
  {
    path: ':id',
    component: MovieDetails
  }
];
