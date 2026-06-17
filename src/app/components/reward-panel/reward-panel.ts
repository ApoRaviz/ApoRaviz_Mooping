import { Component, input, output } from '@angular/core';
import { Customer, RewardOption } from '../../models/reward.models';

@Component({
  selector: 'app-reward-panel',
  templateUrl: './reward-panel.html',
})
export class RewardPanelComponent {
  readonly customer = input.required<Customer>();
  readonly rewards = input.required<RewardOption[]>();
  readonly rewardSelected = output<RewardOption>();
}
