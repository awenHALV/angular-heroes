import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HeroService } from '../hero.service';
import { Hero } from '../mock-heros';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  constructor(private heroService: HeroService) { }

  ngOnInit() {
  }

  search(name: string) {
    this.heroes$ = this.heroService.searchHero(name).pipe(
      debounceTime(3000),
      // ignore new term if same as previous term
      distinctUntilChanged(),
    );
  }

}
