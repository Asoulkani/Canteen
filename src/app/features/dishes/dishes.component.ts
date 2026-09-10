import {Component, inject} from '@angular/core';
import {DishesService} from '../../core/dishes.service';

@Component({
  selector: 'app-dishes',
  imports: [],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.scss'
})
export class DishesComponent {
  protected dishesService = inject(DishesService);
}
