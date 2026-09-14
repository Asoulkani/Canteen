import {Component, input, output} from '@angular/core';
import {Dishes} from '../../../core/models/dishes.model';

@Component({
  selector: 'app-dish-card',
  imports: [],
  templateUrl: './dish-card.component.html',
  styleUrl: './dish-card.component.scss'
})
export class DishCardComponent {
  dish = input.required<Dishes>();

  readonly add = output<void>();

  onAdd(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.add.emit();
  }
}
