import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { DisplayPanelComponent } from './components/display-panel/display-panel';
import { LinePanelComponent } from './components/line-panel/line-panel';
import { PosPanelComponent } from './components/pos-panel/pos-panel';
import { RewardPanelComponent } from './components/reward-panel/reward-panel';
import { TopNavComponent } from './components/top-nav/top-nav';
import { Customer, LastSale, LineMessage, RewardOption } from './models/loyalty.models';

@Component({
  selector: 'app-root',
  imports: [TopNavComponent, DisplayPanelComponent, PosPanelComponent, RewardPanelComponent, LinePanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  protected readonly quickAmounts = [1, 3, 5, 10];
  protected readonly rewards: RewardOption[] = [
    { id: 'pork-stick', name: 'หมูปิ้ง 1 ไม้', icon: 'M' },
    { id: 'sticky-rice', name: 'ข้าวเหนียว 1 ห่อ', icon: 'R' },
    { id: 'save-later', name: 'เก็บสิทธิ์ไว้ก่อน', icon: 'S' },
  ];

  protected readonly customers = signal<Customer[]>([
    { id: 'a', name: 'คุณ A', phone: '081-111-1111', sticks: 7, pendingRewards: 0, savedRewards: 0, totalPurchased: 7 },
    { id: 'b', name: 'คุณ B', phone: '082-222-2222', sticks: 9, pendingRewards: 0, savedRewards: 1, totalPurchased: 19 },
    { id: 'c', name: 'คุณ C', phone: '083-333-3333', sticks: 2, pendingRewards: 1, savedRewards: 2, totalPurchased: 32 },
  ]);
  protected readonly selectedCustomerId = signal('a');
  protected readonly customerSearch = signal('');
  protected readonly pendingSticks = signal(0);
  protected readonly lastSale = signal<LastSale | null>(null);
  protected readonly lineMessages = signal<LineMessage[]>([
    {
      id: 1,
      time: 'Demo',
      text: 'ยินดีต้อนรับสู่ MooPing Loyalty ซื้อครบ 10 ไม้ เลือกของแถมเองได้เลย',
    },
  ]);

  protected readonly selectedCustomer = computed(() => {
    return this.customers().find((customer) => customer.id === this.selectedCustomerId()) ?? this.customers()[0];
  });

  // ใช้สำหรับค้นหาลูกค้าหน้าร้านจากชื่อหรือเบอร์ โดยยังเก็บ source data จริงไว้ที่ customers()
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
    const customer = this.selectedCustomer();
    const pending = this.pendingSticks();
    const nextTotalSticks = customer.sticks + pending;
    const earnedRewards = Math.floor(nextTotalSticks / 10);

    return {
      earnedRewards,
      remainingSticks: nextTotalSticks % 10,
      nextTotalPurchased: customer.totalPurchased + pending,
      nextProgressLabel: pending > 0 ? `${nextTotalSticks % 10}/10` : `${customer.sticks}/10`,
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

  protected readonly progressMessage = computed(() => {
    const customer = this.selectedCustomer();

    if (customer.pendingRewards > 0) {
      return `มี reward ${customer.pendingRewards} สิทธิ์ที่รอเลือกของแถม`;
    }

    const remaining = 10 - customer.sticks;
    return remaining === 10 ? 'เริ่มสะสมรอบใหม่ได้เลย' : `อีก ${remaining} ไม้จะได้รับ reward`;
  });

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

    this.lastSale.set({ customerId: customerBefore.id, customerBefore, sticksAdded: amount });
    this.pendingSticks.set(0);
    this.pushLineMessage(
      earnedRewards > 0
        ? `${customerBefore.name} ซื้อเพิ่ม ${amount} ไม้ ครบ 10 แล้ว เลือกของแถมได้ ${earnedRewards} สิทธิ์`
        : `${customerBefore.name} ซื้อเพิ่ม ${amount} ไม้ ${10 - remainingSticks} ไม้จะครบ reward แล้ว`,
    );
  }

  protected undoLastSale(): void {
    const sale = this.lastSale();

    if (!sale) {
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
    const customer = this.selectedCustomer();

    if (customer.pendingRewards + customer.savedRewards <= 0) {
      return;
    }

    if (reward.id === 'save-later' && customer.pendingRewards <= 0) {
      return;
    }

    this.customers.update((customers) =>
      customers.map((item) => {
        if (item.id !== customer.id) {
          return item;
        }

        if (reward.id === 'save-later') {
          return {
            ...item,
            pendingRewards: item.pendingRewards - 1,
            savedRewards: item.savedRewards + 1,
          };
        }

        if (item.pendingRewards > 0) {
          return { ...item, pendingRewards: item.pendingRewards - 1 };
        }

        return { ...item, savedRewards: item.savedRewards - 1 };
      }),
    );

    this.pushLineMessage(
      reward.id === 'save-later'
        ? `${customer.name} เก็บ reward ไว้ใช้ครั้งหน้า ตอนนี้มีสิทธิ์ที่เก็บไว้ ${customer.savedRewards + 1} สิทธิ์`
        : `${customer.name} เลือกของแถมเป็น ${reward.name} เรียบร้อยแล้ว`,
    );
  }

  private pushLineMessage(text: string): void {
    const now = new Date();
    const time = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    this.lineMessages.update((messages) => [{ id: Date.now(), time, text }, ...messages].slice(0, 4));
  }
}
