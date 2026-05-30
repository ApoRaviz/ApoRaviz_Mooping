import { Component, computed, signal } from '@angular/core';

type Customer = {
  id: string;
  name: string;
  phone: string;
  sticks: number;
  pendingRewards: number;
  totalPurchased: number;
};

type LineMessage = {
  id: number;
  time: string;
  text: string;
};

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly quickAmounts = [1, 3, 5, 10];
  protected readonly rewards = [
    { id: 'pork-stick', name: 'หมูปิ้ง 1 ไม้', icon: 'M' },
    { id: 'sticky-rice', name: 'ข้าวเหนียว 1 ห่อ', icon: 'R' },
    { id: 'save-later', name: 'เก็บสิทธิ์ไว้ก่อน', icon: 'S' },
  ];

  protected readonly customers = signal<Customer[]>([
    { id: 'a', name: 'คุณ A', phone: '081-111-1111', sticks: 7, pendingRewards: 0, totalPurchased: 7 },
    { id: 'b', name: 'คุณ B', phone: '082-222-2222', sticks: 9, pendingRewards: 0, totalPurchased: 19 },
    { id: 'c', name: 'คุณ C', phone: '083-333-3333', sticks: 2, pendingRewards: 1, totalPurchased: 32 },
  ]);
  protected readonly selectedCustomerId = signal('a');
  protected readonly displayPulseKey = signal(0);
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

  protected readonly stamps = computed(() => Array.from({ length: 10 }, (_, index) => index + 1));

  protected readonly progressMessage = computed(() => {
    const customer = this.selectedCustomer();

    if (customer.pendingRewards > 0) {
      return `มี reward ${customer.pendingRewards} สิทธิ์ที่รอเลือกของแถม`;
    }

    const remaining = 10 - customer.sticks;
    return remaining === 10 ? 'เริ่มสะสมรอบใหม่ได้เลย' : `อีก ${remaining} ไม้จะได้รับ reward`;
  });

  protected selectCustomer(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedCustomerId.set(select.value);
    this.displayPulseKey.update((value) => value + 1);
  }

  protected addSticks(amount: number): void {
    const customer = this.selectedCustomer();
    const nextTotalSticks = customer.sticks + amount;
    const earnedRewards = Math.floor(nextTotalSticks / 10);
    const remainingSticks = nextTotalSticks % 10;

    this.customers.update((customers) =>
      customers.map((item) =>
        item.id === customer.id
          ? {
              ...item,
              sticks: remainingSticks,
              pendingRewards: item.pendingRewards + earnedRewards,
              totalPurchased: item.totalPurchased + amount,
            }
          : item,
      ),
    );

    this.pushLineMessage(
      earnedRewards > 0
        ? `${customer.name} ซื้อเพิ่ม ${amount} ไม้ ครบ 10 แล้ว เลือกของแถมได้ ${earnedRewards} สิทธิ์`
        : `${customer.name} ซื้อเพิ่ม ${amount} ไม้ ${10 - remainingSticks} ไม้จะครบ reward แล้ว`,
    );
    this.displayPulseKey.update((value) => value + 1);
  }

  protected claimReward(rewardName: string): void {
    const customer = this.selectedCustomer();

    if (customer.pendingRewards <= 0) {
      return;
    }

    this.customers.update((customers) =>
      customers.map((item) =>
        item.id === customer.id ? { ...item, pendingRewards: item.pendingRewards - 1 } : item,
      ),
    );

    this.pushLineMessage(`${customer.name} เลือกของแถมเป็น ${rewardName} เรียบร้อยแล้ว`);
    this.displayPulseKey.update((value) => value + 1);
  }

  private pushLineMessage(text: string): void {
    const now = new Date();
    const time = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    this.lineMessages.update((messages) => [{ id: Date.now(), time, text }, ...messages].slice(0, 4));
  }
}
