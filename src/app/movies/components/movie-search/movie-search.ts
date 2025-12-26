import { Component, output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  imports: [],
  templateUrl: './movie-search.html',
  styleUrl: './movie-search.scss',
})
export class MovieSearch {
  public onSearch = output<string>();
  private searchText = new Subject<string>();


  constructor() {
    this.searchText
      .pipe(debounceTime(300))
      .subscribe(value => this.onSearch.emit(value));
  }

  protected search(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchText.next(inputElement.value);
  };
}