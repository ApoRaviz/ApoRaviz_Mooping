import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Customer } from '../models/reward.models';
import { PrototypeStorageService } from './prototype-storage.service';

const customers: Customer[] = [
  {
    id: 'test',
    name: 'ลูกค้าทดลอง',
    phone: '080-000-0000',
    sticks: 4,
    pendingRewards: 0,
    savedRewards: 1,
    totalPurchased: 14,
  },
];

describe('PrototypeStorageService', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('stores and restores prototype customers in the browser', () => {
    const storage = TestBed.inject(PrototypeStorageService);

    storage.saveCustomers(customers);

    expect(storage.loadCustomers()).toEqual(customers);
  });

  it('ignores invalid saved data', () => {
    window.localStorage.setItem('mooping-reward.prototype.customers.v1', '{"unexpected":true}');

    expect(TestBed.inject(PrototypeStorageService).loadCustomers()).toBeNull();
  });

  it('does not access browser storage during SSR', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });
    const storage = TestBed.inject(PrototypeStorageService);

    expect(storage.loadCustomers()).toBeNull();
    expect(() => storage.saveCustomers(customers)).not.toThrow();
    expect(() => storage.clearCustomers()).not.toThrow();
  });
});
