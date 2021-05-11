import { AfterViewInit, Component, OnInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeMap, scan } from 'rxjs/operators';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})
export class AbilitiesComponent implements OnInit, AfterViewInit {
  title = 'abilities';
  isLoading = false;
  offset = 0;
  abilities = [];
  yPos = 0;
  temp = 0;
  counter = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getAbilities(this.offset).pipe(
      map((res: any) => {
        this.abilities = res.results;
        this.counter = this.abilities.length;
        this.isLoading = false;

      })
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.abilityScroller();
  }

  abilityScroller(): void {
    const abilityCont = document.querySelector('.abilities');
    fromEvent(abilityCont, 'scroll').pipe(
      debounceTime(500),
      map((e: any) => this.temp = e.target.scrollTop),
      mergeMap(() => {
        if (this.temp > this.yPos) {
          return of(this.offset += 20);
        }
        return of(this.offset);
      }),
      mergeMap(() => {
        if (this.temp > this.yPos) {
          this.yPos = this.temp;
          return this.api.getAbilities(this.offset);
        }
        return of([]);
      }),
      map((res: any) => {
        if (res.results) {
          this.abilities = [...this.abilities, ...res.results];
          this.counter = this.abilities.length;
        }
      }),
      distinctUntilChanged(),
    ).subscribe();
  }
}
