import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Hero } from '../mock-heros';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  id = +this.route.snapshot.paramMap.get('id');
  hero: Hero | undefined;
  constructor(
    private route: ActivatedRoute,
    private http: HeroService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero() {
    this.http.getHeroDetail(this.id).subscribe(res => {
      this.hero = res;
    });
  }

  goBack(): void {
    // this.router.navigate(['/dashboard']);
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.http.updateHero(this.hero).subscribe(() => {
        this.goBack();
      });
    }
  }
}
