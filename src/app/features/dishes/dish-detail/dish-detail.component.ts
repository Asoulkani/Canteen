import {Component, computed, inject, signal} from '@angular/core';
import {Dishes} from '../../../core/models/dishes.model';
import {DishCardComponent} from '../dish-card/dish-card.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {DishesService} from '../../../core/dishes.service';
import {AuthService} from '../../../core/auth.service';

@Component({
  selector: 'app-dish-detail',
  imports: [
    DishCardComponent,
    RouterLink
  ],
  templateUrl: './dish-detail.component.html',
  styleUrl: './dish-detail.component.scss'
})
export class DishDetailComponent{
  private route = inject(ActivatedRoute);
  protected dishService = inject(DishesService);
  protected authService = inject(AuthService);

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

  private name = decodeURIComponent(this.route.snapshot.paramMap.get('name') ?? '');
  readonly dish = computed(() =>
    this.dishService.dishes().find(value => value.name === this.name)
  );
}
