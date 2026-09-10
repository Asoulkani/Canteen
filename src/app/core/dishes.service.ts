import {inject, Injectable} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {HttpClient} from '@angular/common/http';
import {Dishes} from './models/dishes.model';
import {environment} from '../environements/environement';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  private http = inject(HttpClient);

  constructor() { }

  readonly dishes = toSignal(
    this.http.get<Dishes[]>(`${environment.apiUrl}/dishes`), { initialValue: [] }
  );
}
