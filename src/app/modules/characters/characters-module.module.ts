import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterRoutingModule } from './character-routing-module';

@NgModule({
  declarations: [
    CharacterListComponent
  ],
  imports: [
    CommonModule,
    CharacterRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule
  ],
  exports: [
    CharacterListComponent
  ]
})
export class CharactersModuleModule { }
