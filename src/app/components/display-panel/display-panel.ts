import { Component, input } from '@angular/core';
import { CheckoutPreview, Customer, SaleMode } from '../../models/reward.models';

@Component({
  selector: 'app-display-panel',
  templateUrl: './display-panel.html',
  styleUrl: './display-panel.css',
})
export class DisplayPanelComponent {
  readonly customer = input.required<Customer>();
  readonly progressMessage = input.required<string>();
  readonly stamps = input.required<number[]>();
  readonly saleMode = input.required<SaleMode>();
  readonly pendingSticks = input.required<number>();
  readonly checkoutPreview = input.required<CheckoutPreview>();
  readonly quickRewardCredits = input.required<number>();
}
