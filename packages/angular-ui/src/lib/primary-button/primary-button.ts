import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'se-primary-button',
  standalone: true,
  templateUrl: './primary-button.html',
  styleUrl: './primary-button.css',
})
export class PrimaryButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (this.disabled) {
      return;
    }

    this.buttonClick.emit(event);
  }
}
