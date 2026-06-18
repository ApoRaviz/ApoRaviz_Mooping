import { inject, Injectable, InjectionToken, signal, Signal } from '@angular/core';
import { Customer } from '../models/reward.models';

export type CustomerUpdater = (customers: Customer[]) => Customer[];

export interface CustomerRepository {
  readonly customers: Signal<Customer[]>;
  updateCustomers(updater: CustomerUpdater): void;
}

@Injectable({
  providedIn: 'root',
})
export class MockCustomerRepository implements CustomerRepository {
  private readonly customerState = signal<Customer[]>([
    {
      id: 'a',
      name: 'คุณเอ',
      phone: '081-111-1111',
      sticks: 7,
      pendingRewards: 0,
      savedRewards: 0,
      totalPurchased: 7,
    },
    {
      id: 'b',
      name: 'คุณบี',
      phone: '082-222-2222',
      sticks: 9,
      pendingRewards: 0,
      savedRewards: 1,
      totalPurchased: 19,
    },
    {
      id: 'c',
      name: 'คุณซี',
      phone: '083-333-3333',
      sticks: 2,
      pendingRewards: 1,
      savedRewards: 2,
      totalPurchased: 32,
    },
  ]);

  readonly customers = this.customerState.asReadonly();

  updateCustomers(updater: CustomerUpdater): void {
    this.customerState.update(updater);
  }
}

export const CUSTOMER_REPOSITORY = new InjectionToken<CustomerRepository>('CUSTOMER_REPOSITORY', {
  providedIn: 'root',
  factory: () => inject(MockCustomerRepository),
});
