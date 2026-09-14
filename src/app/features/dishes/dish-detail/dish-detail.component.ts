import {Component, computed, inject} from '@angular/core';
import {Dishes} from '../../../core/models/dishes.model';
import {DishCardComponent} from '../dish-card/dish-card.component';
import {ActivatedRoute} from '@angular/router';
import {DishesService} from '../../../core/dishes.service';

@Component({
  selector: 'app-dish-detail',
  imports: [
    DishCardComponent
  ],
  templateUrl: './dish-detail.component.html',
  styleUrl: './dish-detail.component.scss'
})
export class DishDetailComponent{
  private route = inject(ActivatedRoute);
  private dishService = inject(DishesService);

  private name = decodeURIComponent(this.route.snapshot.paramMap.get('name') ?? '');
  readonly dish = computed(() =>
    this.dishService.dishes().find(value => value.name === this.name)
  );
}
