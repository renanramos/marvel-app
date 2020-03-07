import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, debounceTime } from "rxjs/operators/";
import { Subscription } from 'rxjs';

import { CharacterService } from '../../../core/http/character.service';
import { Character } from '../../../core/models/character';
import { InfiniteScrollValues } from '../../../core/shared/infinite-scroll-values';
import { ImageValues } from '../../../core/shared/image-values';
import { AttributionData } from '../../../core/models/attribution-data';
import { SearchService } from '../../../core/http/search.service';


@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  providers: [CharacterService]
})
export class CharacterListComponent implements OnInit, OnDestroy {

  characters: Character[] = [];
  attributionData: AttributionData;

  isLoadingCharacters: boolean = false;
  dataNotFound: boolean = false;
  
  isLoadingMore: boolean = false;

  scrollOffset = InfiniteScrollValues.SCROLL_INITIAL_OFFSET;
  infiniteScrollDistance = InfiniteScrollValues.SCROLL_DISTANCE;
  infiniteScrollThrottle = InfiniteScrollValues.SCROLL_THROTTLE;

  searchSubscription: Subscription;

  filterString = '';

  constructor(
      private characterService: CharacterService,
      private searchService: SearchService) {}

  async ngOnInit() {
    this.initializeSearchSubscription();
    await this.getCharacters();
  }

  ngOnDestroy(): void {
    this.searchSubscription &&
      this.searchSubscription.unsubscribe();
  }

  initializeSearchSubscription() {
    this.searchSubscription = this.searchService.search$.asObservable()
    .pipe(debounceTime(300))
    .subscribe(characterName => {
      if(characterName) {
        this.filterString = characterName;
      } else {
        this.filterString = '';
      }
      this.getCharacters();
    });
  }

  async getCharacters() {

    this.isLoadingCharacters = true;

    const receivedCharacters = {
      next: (response) => {
        this.setAttributionData(response);
        this.characters = response['data']['results'];
        this.isLoadingCharacters = false;
        this.dataNotFound = false;
        this.scrollOffset += InfiniteScrollValues.SCROLL_INCREASE_OFFSET;
      },
      error: (response) => {
        this.isLoadingCharacters = false;
        this.dataNotFound = true;
      }
    }

    await this.characterService.getCharacters(null, this.filterString)
      .pipe(tap(receivedCharacters))
      .toPromise()
      .then();
  }

  getImageUrl(character: Character) {
    return `${character.thumbnail['path']}/${ImageValues.VARIANT_NAME}.${character.thumbnail['extension']}`;
  }

  setAttributionData(response: any) {
    this.attributionData = new AttributionData(response['attributionText'], response['attributionHTML'], response['copyright']);
  }

  async onScrollDown() {
    
    if (!this.isLoadingMore) {
      
     this.isLoadingMore = true;

     const receivedCharacters = {
        next: (characters) => {
          if(characters) {
            this.characters = [...this.characters, ...characters['data']['results']];
            this.isLoadingMore = false;
            this.scrollOffset += InfiniteScrollValues.SCROLL_INCREASE_OFFSET;
          }
        },
        error: (response) => this.isLoadingMore = false
      };
  
      await this.characterService.getCharacters(this.scrollOffset, this.filterString)
        .pipe(tap(receivedCharacters))
        .toPromise()
        .then();
    }

  }
}
