import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TagsComponent } from './tags/tags.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonStatsComponent } from './pokemon-stats/pokemon-stats.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, TagsComponent, PokemonsComponent, PokemonStatsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
