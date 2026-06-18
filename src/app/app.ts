import { Component, inject, ViewEncapsulation } from '@angular/core';
import { DisplayPanelComponent } from './components/display-panel/display-panel';
import { LinePanelComponent } from './components/line-panel/line-panel';
import { PosPanelComponent } from './components/pos-panel/pos-panel';
import { RewardPanelComponent } from './components/reward-panel/reward-panel';
import { ShiftStatusPanelComponent } from './components/shift-status-panel/shift-status-panel';
import { TopNavComponent } from './components/top-nav/top-nav';
import { RewardOption, SaleMode } from './models/reward.models';
import { LoyaltyStoreService } from './services/loyalty-store.service';

@Component({
  selector: 'app-root',
  imports: [
    TopNavComponent,
    DisplayPanelComponent,
    PosPanelComponent,
    RewardPanelComponent,
    ShiftStatusPanelComponent,
    LinePanelComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  protected readonly store = inject(LoyaltyStoreService);

  protected selectSaleMode(mode: SaleMode): void {
    this.store.selectSaleMode(mode);
  }

  protected selectCustomer(customerId: string): void {
    this.store.selectCustomer(customerId);
  }

  protected updateCustomerSearch(keyword: string): void {
    this.store.updateCustomerSearch(keyword);
  }

  protected addPendingSticks(amount: number): void {
    this.store.addPendingSticks(amount);
  }

  protected removePendingStick(): void {
    this.store.removePendingStick();
  }

  protected clearPendingSale(): void {
    this.store.clearPendingSale();
  }

  protected confirmPendingSale(): void {
    this.store.confirmPendingSale();
  }

  protected undoLastSale(): void {
    this.store.undoLastSale();
  }

  protected claimReward(reward: RewardOption): void {
    this.store.claimReward(reward);
  }

  protected resetPrototypeData(): void {
    this.store.resetPrototypeData();
  }
}
