import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { SearchService } from '../../../core/http/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private searchService: SearchService) { }

  ngOnInit() {
    this.createSearchForm();
  }

  createSearchForm(){
    this.searchForm = this.formBuilder.group({
      search: ['']
    })
  }

  onSearchCharacter(event: any) {
    let characterName = event.target.value;
    this.searchService.onSearchCharacter(characterName);
  }
}
