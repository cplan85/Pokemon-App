import { LocalPokemonsService } from './../services/local-pokemons.service';
import { LocalImagesService } from './../services/local-images.service';
import { AfterViewInit, Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { WebService } from '../services/web.service';
import { CurrentStatsService } from '../services/current-stats.service';
import { Router } from '@angular/router';
import { GetPokemon } from '../interfaces/get-pokemon';
import { LocalImages } from '../interfaces/local-images';
import { SearchService } from '../services/search.service';
import { QueryList } from '@angular/core';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit, AfterViewInit {
  images: LocalImages[] = [];
  fullPokemons: GetPokemon[] = [];
  temporaryPokemons: GetPokemon[] = [];

  @ViewChildren("theLastList", {read: ElementRef})
  theLastList: QueryList<ElementRef>;
  observer: any;

  constructor(
    private webService: WebService,
    public router: Router,
    private currentStatsService: CurrentStatsService,
    public localImageService: LocalImagesService,
    public localPokemonService: LocalPokemonsService,
    public searchService: SearchService
  ) {}

  ngAfterViewInit(): void {
    this.theLastList.changes.subscribe((d) => {
      console.log(d, "dd")
      if (d.last) this.observer.observe(d.last.nativeElement)
    })
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }
    
    this.observer = new IntersectionObserver( (entries)=> {
      if(entries[0].isIntersecting) {
       // console.log("scroll more")
      
        this.getNextPokemons()}
      
    }, options);
  }

  getPokemons() {
    if (this.localPokemonService.localPokemonsInit.length === 0) {
      this.webService.getAllPokemons().subscribe((resultObject) => {
        this.webService.setNextApi(resultObject.next);
        console.log("resultTotal", resultObject )
        resultObject.results.forEach((pokemon) => {
          this.getImage_and_fullPokemon(pokemon.url);
        });
        
      });
      
    } else {
      this.fullPokemons = this.localPokemonService.localPokemons;
      this.images = this.localImageService.localImages;
    }
  }

  getNextPokemons() {
   // this.spinner.show();
    this.webService.getNextPokemons().subscribe((resultObject) => {
      //this.spinner.hide();
      resultObject.results.forEach((pokemon, i) => {
       this.getImage_and_fullPokemon(pokemon.url);
      });
      this.webService.setNextApi(resultObject.next);
    });
  }

  getImage_and_fullPokemon(url: string) {
    this.webService.getPokemon(url).subscribe((fullPokemon) => {
      const imgURL = fullPokemon.sprites.other.dream_world.front_default;
      const fixedURL = imgURL.replace(
        'master/https://raw.githubusercontent.com/PokeAPI/sprites/',
        ''
      );

      const id = fullPokemon.sprites.other.dream_world.front_default.replace(
        /[^0-9]/g,
        ''
      );

      let pokemonTypesArr = fullPokemon.types.map((object) => {
        return object.type.name;
      });

      this.fullPokemons[parseInt(id) - 1] = fullPokemon;
      this.fullPokemons[parseInt(id) - 1].imageSimplified = fixedURL;
      this.fullPokemons[parseInt(id) - 1].typesArr = pokemonTypesArr;
      console.log(this.fullPokemons[parseInt(id) - 1].typesArr);
      this.images[parseInt(id) - 1] = {
        image: fixedURL,
        pokemonName: fullPokemon.name,
      };
    });
    this.localPokemonService.setlocalPokemons(this.fullPokemons);
    this.localImageService.setlocalImages(this.images);

    this.temporaryPokemons = this.fullPokemons;
  }

  navigateToPokemon(index: number) {
    this.currentStatsService.setCurrentPokemon(
      this.localPokemonService.localPokemons[index]
    );
    this.router.navigate(['stats'], {
      queryParams: {
        id: index,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    this.getPokemons();
    this.intersectionObserver();
  }
}
