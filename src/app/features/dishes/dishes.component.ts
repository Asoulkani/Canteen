import {Component, inject, signal} from '@angular/core';
import {DishesService} from '../../core/dishes.service';
import {DishCardComponent} from './dish-card/dish-card.component';
import {RouterLink} from '@angular/router';
import {Dishes} from '../../core/models/dishes.model';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-dishes',
  imports: [
    DishCardComponent,
    RouterLink
  ],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.scss'
})
export class DishesComponent {
  protected authService = inject(AuthService);
  protected dishesService = inject(DishesService);
  protected addToOrderError = signal<string | null>(null);
  protected addToOrderSuccess = signal<string | null>(null);

  addDish(dish: Dishes) {
    this.addToOrderError.set(null);
    this.addToOrderSuccess.set(null);
    this.authService.addOrder(dish).subscribe({
      next: () => {
        this.addToOrderSuccess.set('Added to your order');
      },
      error: () => {
        this.addToOrderError.set('Could not add this dish');
      }
    });
  }
}
