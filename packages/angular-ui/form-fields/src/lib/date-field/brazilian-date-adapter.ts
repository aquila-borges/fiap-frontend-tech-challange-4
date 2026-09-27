import { Injectable } from '@angular/core';
import { MatDateFormats, NativeDateAdapter } from '@angular/material/core';

const BRAZILIAN_DATE_INPUT = { format: 'DD/MM/YYYY' };

export const BRAZILIAN_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: BRAZILIAN_DATE_INPUT,
  },
  display: {
    dateInput: BRAZILIAN_DATE_INPUT,
    monthYearLabel: { month: 'short', year: 'numeric' },
    dateA11yLabel: { day: '2-digit', month: 'long', year: 'numeric' },
    monthYearA11yLabel: { month: 'long', year: 'numeric' },
  },
};

@Injectable()
export class BrazilianDateAdapter extends NativeDateAdapter {
  override parse(value: unknown): Date | null {
    if (typeof value === 'string') {
      const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
      if (match) {
        const day = Number(match[1]);
        const month = Number(match[2]) - 1;
        const year = Number(match[3]);
        const date = new Date(year, month, day);

        return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day
          ? date
          : this.invalid();
      }
    }

    return super.parse(value);
  }

  override format(date: Date, displayFormat: object): string {
    if (displayFormat === BRAZILIAN_DATE_INPUT) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${day}/${month}/${date.getFullYear()}`;
    }

    return super.format(date, displayFormat);
  }
}