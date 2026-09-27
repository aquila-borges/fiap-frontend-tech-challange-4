import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { getFormFieldError } from '../form-field/form-field-errors';
import { FormFieldErrorMessages, SelectFieldOption } from '../form-field/form-field.models';

@Component({
  selector: 'se-select',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './select-field.html',
  styleUrl: './select-field.css',
})
export class SelectFieldComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label = '';
  @Input() placeholder = '';
  @Input() options: readonly SelectFieldOption[] = [];
  @Input() errorMessages: FormFieldErrorMessages = {};

  get errorMessage(): string {
    return getFormFieldError(this.control, this.errorMessages);
  }
}