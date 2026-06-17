import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { DisplayPanelComponent } from './components/display-panel/display-panel';
import { LinePanelComponent } from './components/line-panel/line-panel';
import { PosPanelComponent } from './components/pos-panel/pos-panel';
import { RewardPanelComponent } from './components/reward-panel/reward-panel';
import { TopNavComponent } from './components/top-nav/top-nav';
import { Customer, LastSale, LineMessage, RewardOption, SaleMode } from './models/reward.models';

@Component({
  selector: 'app-root',
  imports: [TopNavComponent, DisplayPanelComponent, PosPanelComponent, RewardPanelComponent, LinePanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  protected readonly quickAmounts = [1, 5, 10, 20];
  protected readonly rewards: RewardOption[] = [
    { id: 'pork-stick', name: 'หมูปิ้ง 1 ไม้', shortName: 'หมูปิ้ง', icon: 'หมู' },
    { id: 'water', name: 'น้ำเปล่า 1 ขวด', shortName: 'น้ำเปล่า', icon: 'น้ำ' },
    { id: 'sticky-rice', name: 'ข้าวเหนียว 1 ห่อ', shortName: 'ข้าวเหนียว', icon: 'ข้าว' },
  ];

  protected readonly customers = signal<Customer[]>([
    { id: 'a', name: 'คุณเอ', phone: '081-111-1111', sticks: 7, pendingRewards: 0, savedRewards: 0, totalPurchased: 7 },
    { id: 'b', name: 'คุณบี', phone: '082-222-2222', sticks: 9, pendingRewards: 0, savedRewards: 1, totalPurchased: 19 },
    { id: 'c', name: 'คุณซี', phone: '083-333-3333', sticks: 2, pendingRewards: 1, savedRewards: 2, totalPurchased: 32 },
  ]);
  protected readonly saleMode = signal<SaleMode>('quick');
  protected readonly selectedCustomerId = signal('a');
  protected readonly customerSearch = signal('');
  protected readonly pendingSticks = signal(0);
  protected readonly quickRewardCredits = signal(0);
  protected readonly totalQuickSticks = signal(0);
  protected readonly lastSale = signal<LastSale | null>(null);
  protected readonly lineMessages = signal<LineMessage[]>([
    {
      id: 1,
      time: 'เริ่มต้น',
      text: 'MooPing Reward พร้อมขายเร็ว: ลูกค้าซื้อครบ 10 ไม้ เลือกของแถมได้ทันที โดยไม่ต้องแอด LINE',
    },
  ]);

  protected readonly selectedCustomer = computed(() => {
    return this.customers().find((customer) => customer.id === this.selectedCustomerId()) ?? this.customers()[0];
  });

  protected readonly displayCustomer = computed<Customer>(() => {
    if (this.saleMode() === 'member') {
      return this.selectedCustomer();
    }

    return {
      id: 'walk-in',
      name: 'ลูกค้าหน้าร้าน',
      phone: 'ไม่บันทึกข้อมูลลูกค้า',
      sticks: this.pendingSticks() % 10,
      pendingRewards: this.quickRewardCredits(),
      savedRewards: 0,
      totalPurchased: this.totalQuickSticks() + this.pendingSticks(),
    };
  });

  protected readonly rewardCustomer = computed<Customer>(() => {
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

  // Keep the member lookup secondary so the default morning flow can stay fast.
  protected readonly filteredCustomers = computed(() => {
    const keyword = this.customerSearch().trim().toLowerCase();

    if (!keyword) {
      return this.customers();
    }

    return this.customers().filter((customer) => {
      return customer.name.toLowerCase().includes(keyword) || customer.phone.includes(keyword);
    });
  });

  protected readonly stamps = computed(() => Array.from({ length: 10 }, (_, index) => index + 1));

  protected readonly checkoutPreview = computed(() => {
    const pending = this.pendingSticks();

    if (this.saleMode() === 'quick') {
      const earnedRewards = Math.floor(pending / 10);
      const remainingSticks = pending % 10;

      return {
        earnedRewards,
        remainingSticks,
        nextTotalPurchased: this.totalQuickSticks() + pending,
        nextProgressLabel: pending > 0 ? `${pending}/10 ในบิลนี้` : 'พร้อมขายเร็ว',
        untrackedSticks: remainingSticks,
      };
    }

    const customer = this.selectedCustomer();
    const nextTotalSticks = customer.sticks + pending;
    const earnedRewards = Math.floor(nextTotalSticks / 10);
    const remainingSticks = nextTotalSticks % 10;

    return {
      earnedRewards,
      remainingSticks,
      nextTotalPurchased: customer.totalPurchased + pending,
      nextProgressLabel: pending > 0 ? `${remainingSticks}/10` : `${customer.sticks}/10`,
      untrackedSticks: 0,
    };
  });

  protected readonly checkoutState = computed(() => {
    const pending = this.pendingSticks();
    const preview = this.checkoutPreview();

    if (pending <= 0) {
      return 'empty';
    }

    return preview.earnedRewards > 0 ? 'reward-ready' : 'pending-sale';
  });

  protected readonly shopStatusLabel = computed(() => {
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

  protected readonly progressMessage = computed(() => {
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

    const remaining = 10 - customer.sticks;
    return remaining === 10 ? 'เริ่มสะสมรอบใหม่ได้เลย' : `อีก ${remaining} ไม้จะได้รับ reward`;
  });

  protected selectSaleMode(mode: SaleMode): void {
    this.saleMode.set(mode);
    this.pendingSticks.set(0);
  }

  protected selectCustomer(customerId: string): void {
    this.selectedCustomerId.set(customerId);
    this.pendingSticks.set(0);
  }

  protected updateCustomerSearch(keyword: string): void {
    this.customerSearch.set(keyword);
  }

  protected addPendingSticks(amount: number): void {
    this.pendingSticks.update((sticks) => Math.min(sticks + amount, 99));
  }

  protected removePendingStick(): void {
    this.pendingSticks.update((sticks) => Math.max(sticks - 1, 0));
  }

  protected clearPendingSale(): void {
    this.pendingSticks.set(0);
  }

  protected confirmPendingSale(): void {
    const amount = this.pendingSticks();

    if (amount <= 0) {
      return;
    }

    if (this.saleMode() === 'quick') {
      const earnedRewards = Math.floor(amount / 10);
      const creditsBefore = this.quickRewardCredits();
      const totalQuickSticksBefore = this.totalQuickSticks();

      this.quickRewardCredits.update((credits) => credits + earnedRewards);
      this.totalQuickSticks.update((sticks) => sticks + amount);
      this.lastSale.set({
        mode: 'quick',
        quickRewardCreditsBefore: creditsBefore,
        totalQuickSticksBefore,
        sticksAdded: amount,
        earnedRewards,
      });
      this.pendingSticks.set(0);
      this.pushLineMessage(
        earnedRewards > 0
          ? `ขายเร็ว ${amount} ไม้ ได้ของแถม ${earnedRewards} สิทธิ์ เลือกหมูปิ้ง น้ำเปล่า หรือข้าวเหนียวได้เลย`
          : `ขายเร็ว ${amount} ไม้ จบรายการโดยไม่เก็บข้อมูลลูกค้า`,
      );
      return;
    }

    const customer = this.selectedCustomer();
    const customerBefore = { ...customer };
    const nextTotalSticks = customerBefore.sticks + amount;
    const earnedRewards = Math.floor(nextTotalSticks / 10);
    const remainingSticks = nextTotalSticks % 10;

    this.customers.update((customers) =>
      customers.map((item) =>
        item.id === customerBefore.id
          ? {
              ...item,
              sticks: remainingSticks,
              pendingRewards: customerBefore.pendingRewards + earnedRewards,
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
      earnedRewards,
    });
    this.pendingSticks.set(0);
    this.pushLineMessage(
      earnedRewards > 0
        ? `${customerBefore.name} ซื้อเพิ่ม ${amount} ไม้ ครบ 10 แล้ว เลือกของแถมได้ ${earnedRewards} สิทธิ์`
        : `${customerBefore.name} ซื้อเพิ่ม ${amount} ไม้ อีก ${10 - remainingSticks} ไม้จะครบ reward`,
    );
  }

  protected undoLastSale(): void {
    const sale = this.lastSale();

    if (!sale) {
      return;
    }

    if (sale.mode === 'quick') {
      this.quickRewardCredits.set(sale.quickRewardCreditsBefore);
      this.totalQuickSticks.set(sale.totalQuickSticksBefore);
      this.lastSale.set(null);
      this.pendingSticks.set(0);
      this.pushLineMessage(`ยกเลิกรายการขายเร็วล่าสุด ${sale.sticksAdded} ไม้ และคืนสถานะของแถมแล้ว`);
      return;
    }

    this.customers.update((customers) =>
      customers.map((customer) => (customer.id === sale.customerId ? { ...sale.customerBefore } : customer)),
    );
    this.selectedCustomerId.set(sale.customerId);
    this.lastSale.set(null);
    this.pendingSticks.set(0);
    this.pushLineMessage(`${sale.customerBefore.name} ยกเลิกรายการล่าสุด ${sale.sticksAdded} ไม้ และคืนยอดเดิมแล้ว`);
  }

  protected claimReward(reward: RewardOption): void {
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

    this.customers.update((customers) =>
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

  private pushLineMessage(text: string): void {
    const now = new Date();
    const time = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    this.lineMessages.update((messages) => [{ id: Date.now(), time, text }, ...messages].slice(0, 4));
  }
}
