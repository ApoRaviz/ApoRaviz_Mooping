import { TestBed } from '@angular/core/testing';
import { CUSTOMER_REPOSITORY } from '../repositories/customer.repository';
import { LoyaltyStoreService } from './loyalty-store.service';

describe('LoyaltyStoreService', () => {
  let store: LoyaltyStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(LoyaltyStoreService);
  });

  it('keeps quick sale anonymous and creates reward credits', () => {
    store.addPendingSticks(20);
    store.confirmPendingSale();

    expect(store.totalQuickSticks()).toBe(20);
    expect(store.quickRewardCredits()).toBe(2);
    expect(store.pendingSticks()).toBe(0);
    expect(store.customers()[0].totalPurchased).toBe(7);
  });

  it('reads customer state through the repository contract', () => {
    const repository = TestBed.inject(CUSTOMER_REPOSITORY);

    expect(store.customers).toBe(repository.customers);
  });

  it('adds a member sale to the selected customer and can undo it', () => {
    store.selectSaleMode('member');
    store.addPendingSticks(5);
    store.confirmPendingSale();

    expect(store.selectedCustomer().sticks).toBe(2);
    expect(store.selectedCustomer().pendingRewards).toBe(1);
    expect(store.selectedCustomer().totalPurchased).toBe(12);

    store.undoLastSale();

    expect(store.selectedCustomer().sticks).toBe(7);
    expect(store.selectedCustomer().pendingRewards).toBe(0);
    expect(store.selectedCustomer().totalPurchased).toBe(7);
  });

  it('claims pending rewards before saved rewards', () => {
    store.selectSaleMode('member');
    store.selectCustomer('c');

    store.claimReward(store.rewards[0]);
    expect(store.selectedCustomer().pendingRewards).toBe(0);
    expect(store.selectedCustomer().savedRewards).toBe(2);

    store.claimReward(store.rewards[1]);
    expect(store.selectedCustomer().savedRewards).toBe(1);
  });
});
