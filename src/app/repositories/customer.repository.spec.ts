import { TestBed } from '@angular/core/testing';
import { CUSTOMER_REPOSITORY } from './customer.repository';

describe('CustomerRepository', () => {
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
});
