import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { TemplateComponent } from './template.component';
import { CharactersModuleModule } from '../characters/characters-module.module';
import { TemplateRoutingModule } from './template-routing.module';
import { CharacterListComponent } from '../characters/character-list/character-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BodyComponent,
    TemplateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TemplateRoutingModule,
    CharactersModuleModule
  ],
  exports: [
    TemplateComponent
  ]
})
export class TemplateModule { }
