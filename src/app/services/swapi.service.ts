import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StarWarsPerson } from '../models/star-wars-person';
import { StarWarsMovie } from '../models/star-wars-movie';

@Injectable()
export class SwapiService {
  errorMessage = '';

  constructor(private http: HttpClient) {}

  getStarWarsPeople() {
    return this.http.get<{ results: StarWarsPerson[] }>(
      'https://swapi.dev/api/people/'
    );
  }

  getStarWarsMovieById(id: string) {
    return this.http.get<StarWarsMovie>(`https://swapi.dev/api/films/${id}/`);
  }
}
