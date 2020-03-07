import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  search$: Subject<string> = new Subject<string>();

  constructor() { }

  onSearchCharacter(value: string) {
    this.search$.next(value);
  }

}
