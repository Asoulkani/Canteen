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
  protected addToOrderSucces = signal<string | null>(null);

  addDish(dish: Dishes){
    this.authService.addOrder(dish)?.subscribe({
      next: dish => {
        this.addToOrderSucces.set("Order added");
      },
      error: err =>{
        this.addToOrderError.set("Order was not added");
      }
    });
  }
}
