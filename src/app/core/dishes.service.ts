import {computed, inject, Injectable, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {HttpClient} from '@angular/common/http';
import {Dishes} from './models/dishes.model';
import {environment} from '../environements/environement';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  private http = inject(HttpClient);

  readonly query = signal('');
  readonly vegOnly = signal(false);

  constructor() { }

  readonly dishes = toSignal(
    this.http.get<Dishes[]>(`${environment.apiUrl}/dishes`), { initialValue: [] }
  );

  readonly filteredDishes = computed(() => {
      const q = this.query().trim().toLowerCase();
      return this.dishes().filter((dish) => {
        const matchesName = dish.name.toLowerCase().includes(q);
        const matchesVeg = !this.vegOnly() || dish.isVeg;
        return matchesName && matchesVeg;
      });
    }
  );

}
