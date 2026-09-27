import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'se-icon-button',
  standalone: true,
  imports: [MatRippleModule],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.css',
})
export class IconButtonComponent {
  @Input() label = '';
  @Input() icon = 'arrow_forward';
  @Input() ariaLabel = '';
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
