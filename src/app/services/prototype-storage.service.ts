import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Customer } from '../models/reward.models';

const CUSTOMER_STORAGE_KEY = 'mooping-reward.prototype.customers.v1';

@Injectable({
  providedIn: 'root',
})
export class PrototypeStorageService {
  private readonly platformId = inject(PLATFORM_ID);

  loadCustomers(): Customer[] | null {
    const storage = this.getStorage();

    if (!storage) {
      return null;
    }

    const savedValue = storage.getItem(CUSTOMER_STORAGE_KEY);

    if (!savedValue) {
      return null;
    }

    try {
      const parsedValue: unknown = JSON.parse(savedValue);
      return isCustomerArray(parsedValue) ? parsedValue : null;
    } catch {
      return null;
    }
  }

  saveCustomers(customers: Customer[]): void {
    this.getStorage()?.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customers));
  }

  clearCustomers(): void {
    this.getStorage()?.removeItem(CUSTOMER_STORAGE_KEY);
  }

  private getStorage(): Storage | null {
    return isPlatformBrowser(this.platformId) ? window.localStorage : null;
  }
}

function isCustomerArray(value: unknown): value is Customer[] {
  return (
    Array.isArray(value) &&
    value.every((customer) => {
      if (!customer || typeof customer !== 'object') {
        return false;
      }

      const candidate = customer as Record<string, unknown>;
      return (
        typeof candidate['id'] === 'string' &&
        typeof candidate['name'] === 'string' &&
        typeof candidate['phone'] === 'string' &&
        typeof candidate['sticks'] === 'number' &&
        typeof candidate['pendingRewards'] === 'number' &&
        typeof candidate['savedRewards'] === 'number' &&
        typeof candidate['totalPurchased'] === 'number'
      );
    })
  );
}
