import { Component, input } from '@angular/core';
import { LineMessage } from '../../models/loyalty.models';

@Component({
  selector: 'app-line-panel',
  templateUrl: './line-panel.html',
})
export class LinePanelComponent {
  readonly messages = input.required<LineMessage[]>();
}
