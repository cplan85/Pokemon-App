import { TestBed } from '@angular/core/testing';

import { LocalPokemonsService } from './local-pokemons.service';

describe('LocalPokemonsService', () => {
  let service: LocalPokemonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalPokemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
