import { Component, input, output } from '@angular/core';
import { CheckoutPreview, Customer, LastSale, SaleMode } from '../../models/reward.models';

@Component({
  selector: 'app-pos-panel',
  templateUrl: './pos-panel.html',
})
export class PosPanelComponent {
  readonly saleMode = input.required<SaleMode>();
  readonly customers = input.required<Customer[]>();
  readonly selectedCustomer = input.required<Customer>();
  readonly selectedCustomerId = input.required<string>();
  readonly customerSearch = input.required<string>();
  readonly quickAmounts = input.required<number[]>();
  readonly pendingSticks = input.required<number>();
  readonly checkoutPreview = input.required<CheckoutPreview>();
  readonly checkoutState = input.required<string>();
  readonly lastSale = input.required<LastSale | null>();

  readonly saleModeChanged = output<SaleMode>();
  readonly customerSelected = output<string>();
  readonly customerSearched = output<string>();
  readonly pendingSticksAdded = output<number>();
  readonly pendingStickRemoved = output<void>();
  readonly pendingSaleCleared = output<void>();
  readonly pendingSaleConfirmed = output<void>();
  readonly lastSaleUndone = output<void>();

  selectCustomer(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.customerSelected.emit(select.value);
  }

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.customerSearched.emit(input.value);
  }
}
