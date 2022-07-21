import { LocalPokemonsService } from './../services/local-pokemons.service';
import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { Tag } from '../interfaces/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  activeTags: string[] = [];

  getTags() {
    this.webService.getAllTags().subscribe((resultObject) => {
      console.log(resultObject);
      resultObject.results.forEach((tag) => {
        this.tags.push({ name: tag.name, url: tag.url, toggled: false });
      });
      console.log(this.tags);
    });
  }

  filterPokemons() {}

  toggleTag(index: number) {
    this.tags[index].toggled = !this.tags[index].toggled;
    console.log(this.tags, 'toggled');
    this.tags[index].toggled
      ? this.activeTags.push(this.tags[index].name)
      : this.activeTags.splice(this.activeTags.indexOf(this.tags[index].name));

    console.log(this.activeTags);
  }
  constructor(
    private webService: WebService,
    private localPokemonService: LocalPokemonsService
  ) {}

  ngOnInit(): void {
    this.getTags();
  }
}
