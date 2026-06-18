import { computed, inject, Injectable, signal } from '@angular/core';
import {
  CheckoutPreview,
  CheckoutState,
  Customer,
  LastSale,
  LineMessage,
  RewardOption,
  SaleMode,
} from '../models/reward.models';
import { CUSTOMER_REPOSITORY } from '../repositories/customer.repository';
import { calculateRewardProgress, STICKS_PER_REWARD } from './reward-calculation';

@Injectable({
  providedIn: 'root',
})
export class LoyaltyStoreService {
  private readonly customerRepository = inject(CUSTOMER_REPOSITORY);

  readonly quickAmounts = [1, 5, 10, 20];
  readonly rewards: RewardOption[] = [
    { id: 'pork-stick', name: 'หมูปิ้ง 1 ไม้', shortName: 'หมูปิ้ง', icon: 'หมู' },
    { id: 'water', name: 'น้ำเปล่า 1 ขวด', shortName: 'น้ำเปล่า', icon: 'น้ำ' },
    { id: 'sticky-rice', name: 'ข้าวเหนียว 1 ห่อ', shortName: 'ข้าวเหนียว', icon: 'ข้าว' },
  ];

  readonly customers = this.customerRepository.customers;
  readonly saleMode = signal<SaleMode>('quick');
  readonly selectedCustomerId = signal('a');
  readonly customerSearch = signal('');
  readonly pendingSticks = signal(0);
  readonly quickRewardCredits = signal(0);
  readonly totalQuickSticks = signal(0);
  readonly lastSale = signal<LastSale | null>(null);
  readonly lineMessages = signal<LineMessage[]>([
    {
      id: 1,
      time: 'เริ่มต้น',
      text: 'MooPing Reward พร้อมขายเร็ว: ลูกค้าซื้อครบ 10 ไม้ เลือกของแถมได้ทันที โดยไม่ต้องแอด LINE',
    },
  ]);

  readonly selectedCustomer = computed(() => {
    return (
      this.customers().find((customer) => customer.id === this.selectedCustomerId()) ??
      this.customers()[0]
    );
  });

  readonly displayCustomer = computed<Customer>(() => {
    if (this.saleMode() === 'member') {
      return this.selectedCustomer();
    }

    return {
      id: 'walk-in',
      name: 'ลูกค้าหน้าร้าน',
      phone: 'ไม่บันทึกข้อมูลลูกค้า',
      sticks: this.pendingSticks() % STICKS_PER_REWARD,
      pendingRewards: this.quickRewardCredits(),
      savedRewards: 0,
      totalPurchased: this.totalQuickSticks() + this.pendingSticks(),
    };
  });

  readonly rewardCustomer = computed<Customer>(() => {
    if (this.saleMode() === 'member') {
      return this.selectedCustomer();
    }

    return {
      id: 'walk-in-reward',
      name: 'ลูกค้าหน้าร้าน',
      phone: 'ขายเร็ว ไม่ผูกบัญชี LINE',
      sticks: 0,
      pendingRewards: this.quickRewardCredits(),
      savedRewards: 0,
      totalPurchased: this.totalQuickSticks(),
    };
  });

  readonly filteredCustomers = computed(() => {
    const keyword = this.customerSearch().trim().toLowerCase();

    if (!keyword) {
      return this.customers();
    }

    return this.customers().filter((customer) => {
      return customer.name.toLowerCase().includes(keyword) || customer.phone.includes(keyword);
    });
  });

  readonly stamps = computed(() =>
    Array.from({ length: STICKS_PER_REWARD }, (_, index) => index + 1),
  );

  readonly checkoutPreview = computed<CheckoutPreview>(() => {
    const pending = this.pendingSticks();

    if (this.saleMode() === 'quick') {
      const calculation = calculateRewardProgress(0, pending);

      return {
        ...calculation,
        nextTotalPurchased: this.totalQuickSticks() + pending,
        nextProgressLabel:
          pending > 0 ? `${pending}/${STICKS_PER_REWARD} ในบิลนี้` : 'พร้อมขายเร็ว',
        untrackedSticks: calculation.remainingSticks,
      };
    }

    const customer = this.selectedCustomer();
    const calculation = calculateRewardProgress(customer.sticks, pending);

    return {
      ...calculation,
      nextTotalPurchased: customer.totalPurchased + pending,
      nextProgressLabel:
        pending > 0
          ? `${calculation.remainingSticks}/${STICKS_PER_REWARD}`
          : `${customer.sticks}/${STICKS_PER_REWARD}`,
      untrackedSticks: 0,
    };
  });

  readonly checkoutState = computed<CheckoutState>(() => {
    if (this.pendingSticks() <= 0) {
      return 'empty';
    }

    return this.checkoutPreview().earnedRewards > 0 ? 'reward-ready' : 'pending-sale';
  });

  readonly shopStatusLabel = computed(() => {
    if (this.checkoutState() === 'reward-ready') {
      return 'มี Reward ใหม่';
    }

    if (this.checkoutState() === 'pending-sale') {
      return 'รอยืนยันยอด';
    }

    if (this.rewardCustomer().pendingRewards + this.rewardCustomer().savedRewards > 0) {
      return 'รอเลือกของแถม';
    }

    return this.saleMode() === 'quick' ? 'พร้อมขายเร็ว' : 'พร้อมขายสมาชิก';
  });

  readonly progressMessage = computed(() => {
    if (this.saleMode() === 'quick') {
      if (this.quickRewardCredits() > 0) {
        return `มีของแถมรอเลือก ${this.quickRewardCredits()} สิทธิ์`;
      }

      if (this.pendingSticks() > 0) {
        const preview = this.checkoutPreview();
        return preview.earnedRewards > 0
          ? `บิลนี้ได้ของแถม ${preview.earnedRewards} สิทธิ์`
          : 'ขายเร็ว: ไม่สะสมข้ามรอบ ถ้าต้องสะสมให้ใช้โหมดสมาชิก';
      }

      return 'พร้อมขายเร็ว ไม่ต้องค้นหาลูกค้า';
    }

    const customer = this.selectedCustomer();

    if (customer.pendingRewards > 0) {
      return `มี reward ${customer.pendingRewards} สิทธิ์ที่รอเลือกของแถม`;
    }

    const remaining = STICKS_PER_REWARD - customer.sticks;
    return remaining === STICKS_PER_REWARD
      ? 'เริ่มสะสมรอบใหม่ได้เลย'
      : `อีก ${remaining} ไม้จะได้รับ reward`;
  });

  selectSaleMode(mode: SaleMode): void {
    this.saleMode.set(mode);
    this.pendingSticks.set(0);
  }

  selectCustomer(customerId: string): void {
    this.selectedCustomerId.set(customerId);
    this.pendingSticks.set(0);
  }

  updateCustomerSearch(keyword: string): void {
    this.customerSearch.set(keyword);
  }

  addPendingSticks(amount: number): void {
    this.pendingSticks.update((sticks) => Math.min(sticks + amount, 99));
  }

  removePendingStick(): void {
    this.pendingSticks.update((sticks) => Math.max(sticks - 1, 0));
  }

  clearPendingSale(): void {
    this.pendingSticks.set(0);
  }

  confirmPendingSale(): void {
    const amount = this.pendingSticks();

    if (amount <= 0) {
      return;
    }

    if (this.saleMode() === 'quick') {
      this.confirmQuickSale(amount);
      return;
    }

    this.confirmMemberSale(amount);
  }

  undoLastSale(): void {
    const sale = this.lastSale();

    if (!sale) {
      return;
    }

    if (sale.mode === 'quick') {
      this.quickRewardCredits.set(sale.quickRewardCreditsBefore);
      this.totalQuickSticks.set(sale.totalQuickSticksBefore);
      this.lastSale.set(null);
      this.pendingSticks.set(0);
      this.pushLineMessage(
        `ยกเลิกรายการขายเร็วล่าสุด ${sale.sticksAdded} ไม้ และคืนสถานะของแถมแล้ว`,
      );
      return;
    }

    this.customerRepository.updateCustomers((customers) =>
      customers.map((customer) =>
        customer.id === sale.customerId ? { ...sale.customerBefore } : customer,
      ),
    );
    this.selectedCustomerId.set(sale.customerId);
    this.lastSale.set(null);
    this.pendingSticks.set(0);
    this.pushLineMessage(
      `${sale.customerBefore.name} ยกเลิกรายการล่าสุด ${sale.sticksAdded} ไม้ และคืนยอดเดิมแล้ว`,
    );
  }

  claimReward(reward: RewardOption): void {
    if (this.saleMode() === 'quick') {
      if (this.quickRewardCredits() <= 0) {
        return;
      }

      this.quickRewardCredits.update((credits) => credits - 1);
      this.pushLineMessage(`ลูกค้าหน้าร้านเลือกของแถมเป็น ${reward.name} เรียบร้อยแล้ว`);
      return;
    }

    const customer = this.selectedCustomer();

    if (customer.pendingRewards + customer.savedRewards <= 0) {
      return;
    }

    this.customerRepository.updateCustomers((customers) =>
      customers.map((item) => {
        if (item.id !== customer.id) {
          return item;
        }

        if (item.pendingRewards > 0) {
          return { ...item, pendingRewards: item.pendingRewards - 1 };
        }

        return { ...item, savedRewards: item.savedRewards - 1 };
      }),
    );

    this.pushLineMessage(`${customer.name} เลือกของแถมเป็น ${reward.name} เรียบร้อยแล้ว`);
  }

  private confirmQuickSale(amount: number): void {
    const calculation = calculateRewardProgress(0, amount);
    const creditsBefore = this.quickRewardCredits();
    const totalQuickSticksBefore = this.totalQuickSticks();

    this.quickRewardCredits.update((credits) => credits + calculation.earnedRewards);
    this.totalQuickSticks.update((sticks) => sticks + amount);
    this.lastSale.set({
      mode: 'quick',
      quickRewardCreditsBefore: creditsBefore,
      totalQuickSticksBefore,
      sticksAdded: amount,
      earnedRewards: calculation.earnedRewards,
    });
    this.pendingSticks.set(0);
    this.pushLineMessage(
      calculation.earnedRewards > 0
        ? `ขายเร็ว ${amount} ไม้ ได้ของแถม ${calculation.earnedRewards} สิทธิ์ เลือกหมูปิ้ง น้ำเปล่า หรือข้าวเหนียวได้เลย`
        : `ขายเร็ว ${amount} ไม้ จบรายการโดยไม่เก็บข้อมูลลูกค้า`,
    );
  }

  private confirmMemberSale(amount: number): void {
    const customer = this.selectedCustomer();
    const customerBefore = { ...customer };
    const calculation = calculateRewardProgress(customerBefore.sticks, amount);

    this.customerRepository.updateCustomers((customers) =>
      customers.map((item) =>
        item.id === customerBefore.id
          ? {
              ...item,
              sticks: calculation.remainingSticks,
              pendingRewards: customerBefore.pendingRewards + calculation.earnedRewards,
              totalPurchased: customerBefore.totalPurchased + amount,
            }
          : item,
      ),
    );

    this.lastSale.set({
      mode: 'member',
      customerId: customerBefore.id,
      customerBefore,
      sticksAdded: amount,
      earnedRewards: calculation.earnedRewards,
    });
    this.pendingSticks.set(0);
    this.pushLineMessage(
      calculation.earnedRewards > 0
        ? `${customerBefore.name} ซื้อเพิ่ม ${amount} ไม้ ครบ 10 แล้ว เลือกของแถมได้ ${calculation.earnedRewards} สิทธิ์`
        : `${customerBefore.name} ซื้อเพิ่ม ${amount} ไม้ อีก ${STICKS_PER_REWARD - calculation.remainingSticks} ไม้จะครบ reward`,
    );
  }

  private pushLineMessage(text: string): void {
    const now = new Date();
    const time = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    this.lineMessages.update((messages) =>
      [{ id: Date.now(), time, text }, ...messages].slice(0, 4),
    );
  }
}
