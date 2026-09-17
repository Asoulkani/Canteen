import {Component, computed, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-orders',
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  private authService = inject(AuthService);

  protected orders = computed(() => this.authService.user()?.orders ?? []);
}
