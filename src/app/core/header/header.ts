import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Search } from '@app/movies/components/movie-search/search';
import { MovieSearch } from "@app/movies/components/movie-search/movie-search";


@Component({
  selector: 'app-header',
  imports: [RouterLink, MovieSearch],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private searchService = inject(Search);

  onSearch(query: string) {
    this.searchService.query.set(query);
  }
}
