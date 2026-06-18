import { Component, input, output } from '@angular/core';
import { Customer } from '../../models/reward.models';

@Component({
  selector: 'app-member-sale-panel',
  templateUrl: './member-sale-panel.html',
})
export class MemberSalePanelComponent {
  readonly customers = input.required<Customer[]>();
  readonly selectedCustomer = input.required<Customer>();
  readonly selectedCustomerId = input.required<string>();
  readonly customerSearch = input.required<string>();

  readonly customerSelected = output<string>();
  readonly customerSearched = output<string>();
  readonly prototypeReset = output<void>();

  selectCustomer(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.customerSelected.emit(select.value);
  }

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.customerSearched.emit(input.value);
  }
}
