import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { PokemonUrl } from '../interfaces/pokemon-url';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  tags: PokemonUrl[] = [];

  getTags() {
    this.webService.getAllTags().subscribe((resultObject) => {
      console.log(resultObject);
      resultObject.results.forEach((tag) => {
        this.tags.push(tag);
      });
      console.log(this.tags);
    });
  }
  constructor(private webService: WebService) {}

  ngOnInit(): void {
    this.getTags();
  }
}
