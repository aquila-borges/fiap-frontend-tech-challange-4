import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions } from '@maskito/core';
import { maskitoNumber } from '@maskito/kit';

import { getFormFieldError } from '../form-field/form-field-errors';
import { FormFieldErrorMessages } from '../form-field/form-field.models';

@Component({
  selector: 'se-input',
  standalone: true,
  imports: [MaskitoDirective, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})
export class InputFieldComponent implements OnChanges {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label = '';
  @Input() type: 'text' | 'number' = 'text';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() inputMode: 'text' | 'decimal' | 'numeric' = 'text';
  @Input() currency = false;
  @Input() prefix = '';
  @Input() thousandSeparator = '.';
  @Input() decimalMarker: '.' | ',' = ',';
  @Input() minimumFractionDigits = 2;
  @Input() maximumFractionDigits = 2;
  @Input() min?: number;
  @Input() step?: number;
  @Input() errorMessages: FormFieldErrorMessages = {};

  maskOptions: MaskitoOptions = maskitoNumber();

  ngOnChanges(): void {
    this.maskOptions = maskitoNumber({
      locale: 'pt-BR',
      prefix: this.prefix,
      thousandSeparator: this.thousandSeparator,
      decimalSeparator: this.decimalMarker,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      min: this.min,
    });
  }

  get errorMessage(): string {
    return getFormFieldError(this.control, this.errorMessages);
  }
}