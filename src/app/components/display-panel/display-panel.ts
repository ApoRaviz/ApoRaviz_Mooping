import { Component, input } from '@angular/core';
import { Customer } from '../../models/loyalty.models';

@Component({
  selector: 'app-display-panel',
  templateUrl: './display-panel.html',
  styleUrl: './display-panel.css',
})
export class DisplayPanelComponent {
  readonly customer = input.required<Customer>();
  readonly progressMessage = input.required<string>();
  readonly stamps = input.required<number[]>();
}
