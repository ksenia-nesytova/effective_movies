import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'movies'
    },
    {
        path: 'movies', loadChildren: () => import('./movies/movies.routes').then(m => m.moviesRoutes)
    },
    {
        path: '**',
        redirectTo: 'movies'
    }
];
