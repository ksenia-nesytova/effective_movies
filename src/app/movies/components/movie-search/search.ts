import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Search {
  public query = signal<string>('');
}
