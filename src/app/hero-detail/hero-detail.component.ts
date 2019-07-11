import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero; //Lấy dữ liệu từ heroes.component 
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }
  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if(param){
      const id = +param; 
      this.getHero(id);
    } 
  }
  getHero(id: number){
    this.heroService.getHero(id).subscribe(hero => this.hero = hero)
  }
  goBack(): void{
    this.location.back();
  }
  save(): void{
    this.heroService.updateHero(this.hero)
    .subscribe(() => this.goBack());
  }
}
