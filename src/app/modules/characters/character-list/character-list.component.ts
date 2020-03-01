import { Component, OnInit } from '@angular/core';
import { tap } from "rxjs/operators/";

import { CharacterService } from '../../../core/http/character.service';
import { Character } from '../../../core/models/character';
import { ImageValues } from '../../../core/shared/image-values';
import { AttributionData } from '../../../core/models/attribution-data';


@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  
  characters: Character;
  attributionData: AttributionData;

  isLoadingCharacters: boolean = false;
  noDataFound: boolean = false;

  constructor(private characterService: CharacterService) {}

  async ngOnInit() {
    await this.getCharacters();
  }

 async getCharacters() {

    this.isLoadingCharacters = true;

    const receivedCharacters = {
      next: (response) => {
        this.setAttributionData(response);
        this.characters = response['data']['results'];
        this.isLoadingCharacters = false;
      },
      error: (response) => {
        this.isLoadingCharacters = false;
        this.noDataFound = true;
      }
    }

    await this.characterService.getCharacters()
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

}
