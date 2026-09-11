import {Component, inject} from '@angular/core';
import {DishesService} from '../../core/dishes.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {DishCardComponent} from './dish-card/dish-card.component';

@Component({
  selector: 'app-dishes',
  imports: [
    ReactiveFormsModule,
    DishCardComponent
  ],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.scss'
})
export class DishesComponent {
  protected dishesService = inject(DishesService);
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.formSearch.controls.vegOnly.valueChanges.subscribe((checked) => {
      console.log("checked");
      this.dishesService.vegOnly.set(checked ?? false);
    });
    this.formSearch.controls.searchQuery.valueChanges.subscribe((query) => {
      console.log("query" + query);
      this.dishesService.query.set(query ?? "");
    })
  }

  protected formSearch = this.formBuilder.group({
    searchQuery: [""],
    vegOnly: [false]
  });
}
