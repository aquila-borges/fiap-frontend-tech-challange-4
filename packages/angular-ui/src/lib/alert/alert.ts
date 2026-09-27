import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AlertType } from './alert.models';

@Component({
  selector: 'se-alert',
  standalone: true,
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class AlertComponent {
  @Input() type: AlertType = 'info';
  @Input() title = '';
  @Input({ required: true }) message = '';
  @Input() dismissible = false;
  @Output() dismiss = new EventEmitter<void>();

  get icon(): string {
    const icons: Record<AlertType, string> = {
      success: 'check_circle',
      error: 'error',
      info: 'info',
      warning: 'warning',
    };

    return icons[this.type];
  }
}