import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public searchString = '';

  setSearchString(value: string) {
    this.searchString = value;
  }

  public getSearchString(): string {
    return this.searchString;
  }

  constructor() {}
}
