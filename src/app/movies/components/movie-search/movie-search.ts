import { Component, output } from '@angular/core';

@Component({
  selector: 'app-movie-search',
  imports: [],
  templateUrl: './movie-search.html',
  styleUrl: './movie-search.scss',
})
export class MovieSearch {
  public onSearch = output<string>();

  protected search(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.onSearch.emit(inputElement.value);
  };
}
