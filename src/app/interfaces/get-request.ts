import { PokemonUrl } from './pokemon-url';

export interface GetRequest {
    count: number;
    next: 'string';
    previous: string | null;
    results: PokemonUrl[];

}
