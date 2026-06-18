import { TestBed } from '@angular/core/testing';
import { CUSTOMER_REPOSITORY } from './customer.repository';

describe('CustomerRepository', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('provides mock customers through the repository contract', () => {
    const repository = TestBed.inject(CUSTOMER_REPOSITORY);

    expect(repository.customers().map((customer) => customer.id)).toEqual(['a', 'b', 'c']);

    repository.updateCustomers((customers) =>
      customers.map((customer) =>
        customer.id === 'a' ? { ...customer, sticks: customer.sticks + 1 } : customer,
      ),
    );

    expect(repository.customers()[0].sticks).toBe(8);
  });

  it('restores initial customers and clears prototype storage', () => {
    const repository = TestBed.inject(CUSTOMER_REPOSITORY);

    repository.updateCustomers((customers) =>
      customers.map((customer) => (customer.id === 'a' ? { ...customer, sticks: 1 } : customer)),
    );
    repository.resetCustomers();

    expect(repository.customers()[0].sticks).toBe(7);
    expect(window.localStorage.length).toBe(0);
  });
});
