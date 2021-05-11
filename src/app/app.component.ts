import { Component, OnInit, AfterViewInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  load = true;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.load = false;
    }, 500);
  }
}
