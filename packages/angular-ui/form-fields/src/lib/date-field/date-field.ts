import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { getFormFieldError } from '../form-field/form-field-errors';
import { FormFieldErrorMessages } from '../form-field/form-field.models';
import { BRAZILIAN_DATE_FORMATS, BrazilianDateAdapter } from './brazilian-date-adapter';

@Component({
  selector: 'se-date-field',
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: BrazilianDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: BRAZILIAN_DATE_FORMATS },
  ],
  templateUrl: './date-field.html',
  styleUrl: './date-field.css',
})
export class DateFieldComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label = '';
  @Input() hint = '';
  @Input() errorMessages: FormFieldErrorMessages = {};

  get errorMessage(): string {
    return getFormFieldError(this.control, this.errorMessages);
  }
}