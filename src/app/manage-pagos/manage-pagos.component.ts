import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-manage-pagos',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './manage-pagos.component.html',
  styleUrls: ['./manage-pagos.component.css']
})
export class ManagePagosComponent {
  stripeUrl: string = 'https://buy.stripe.com/test_00g8Af2Imh0p7q8288';

  redirectToStripe() {
    window.open(this.stripeUrl, '_blank');
  }
}