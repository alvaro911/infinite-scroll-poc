import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint = `${environment.baseUrl}ability/`;

  constructor(private http: HttpClient) { }

  getAbilities(offset: number): Observable<any> {
    return this.http.get(`${this.endpoint}?limit=20&offset=${offset}`).pipe(
      map(res => res)
    );
  }
}
