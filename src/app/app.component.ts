import { Component, VERSION } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {
  StarWarsPerson,
  StarWarsPersonWithFilms
} from './models/star-wars-person';
import { SwapiService } from './services/swapi.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  starWarsPeople = new ReplaySubject<StarWarsPerson[]>(1);
  starWarsPeopleWithFilms = new ReplaySubject<StarWarsPersonWithFilms[]>(1);

  constructor(private swapiService: SwapiService) {}

  getIdFromString(url: string) {
    return url.split('/')[5];
  }

  ngOnInit() {
    this.swapiService.getStarWarsPeople().subscribe(people => {
      this.starWarsPeople.next(people.results);
    });

    this.starWarsPeople.subscribe(people => {
      const withFilms = people.map(person => {
        let films = [];

        person.films.map(film => {
          const id = this.getIdFromString(film);
          this.swapiService.getStarWarsMovieById(id).subscribe(film => {
            films.push(film.title);
          });
        });

        return { ...person, movieTitles: films } as StarWarsPersonWithFilms;
      });
      this.starWarsPeopleWithFilms.next(withFilms);
    });
  }
}
