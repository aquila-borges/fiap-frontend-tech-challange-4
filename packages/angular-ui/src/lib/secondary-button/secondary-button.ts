import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'se-secondary-button',
  standalone: true,
  imports: [MatRippleModule],
  templateUrl: './secondary-button.html',
  styleUrl: './secondary-button.css',
})
export class SecondaryButtonComponent {
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
