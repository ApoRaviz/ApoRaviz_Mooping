import { Component, input } from '@angular/core';
import { SaleMode } from '../../models/reward.models';

@Component({
  selector: 'app-shift-status-panel',
  templateUrl: './shift-status-panel.html',
})
export class ShiftStatusPanelComponent {
  readonly saleMode = input.required<SaleMode>();
  readonly statusLabel = input.required<string>();
  readonly progressMessage = input.required<string>();
}
