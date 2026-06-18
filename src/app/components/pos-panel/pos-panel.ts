import { Component, input, output } from '@angular/core';
import {
  CheckoutPreview,
  CheckoutState,
  Customer,
  LastSale,
  SaleMode,
} from '../../models/reward.models';
import { MemberSalePanelComponent } from '../member-sale-panel/member-sale-panel';
import { QuickSalePanelComponent } from '../quick-sale-panel/quick-sale-panel';

@Component({
  selector: 'app-pos-panel',
  imports: [MemberSalePanelComponent, QuickSalePanelComponent],
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
  readonly checkoutState = input.required<CheckoutState>();
  readonly lastSale = input.required<LastSale | null>();

  readonly saleModeChanged = output<SaleMode>();
  readonly customerSelected = output<string>();
  readonly customerSearched = output<string>();
  readonly pendingSticksAdded = output<number>();
  readonly pendingStickRemoved = output<void>();
  readonly pendingSaleCleared = output<void>();
  readonly pendingSaleConfirmed = output<void>();
  readonly lastSaleUndone = output<void>();
}
