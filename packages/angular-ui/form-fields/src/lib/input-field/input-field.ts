import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { getFormFieldError } from '../form-field/form-field-errors';
import { FormFieldErrorMessages } from '../form-field/form-field.models';

@Component({
  selector: 'se-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, NgxMaskDirective, ReactiveFormsModule],
  providers: [provideNgxMask()],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})
export class InputFieldComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label = '';
  @Input() type: 'text' | 'number' = 'text';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() inputMode: 'text' | 'decimal' | 'numeric' = 'text';
  @Input() mask = '';
  @Input() prefix = '';
  @Input() thousandSeparator = '.';
  @Input() decimalMarker: '.' | ',' = ',';
  @Input() dropSpecialCharacters = true;
  @Input() min?: number;
  @Input() step?: number;
  @Input() errorMessages: FormFieldErrorMessages = {};

  get errorMessage(): string {
    return getFormFieldError(this.control, this.errorMessages);
  }
}