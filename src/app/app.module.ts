import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TagsComponent } from './tags/tags.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonStatsComponent } from './pokemon-stats/pokemon-stats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TagsComponent,
    PokemonsComponent,
    PokemonStatsComponent,
    HighlightTextPipe,
    LandingComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
