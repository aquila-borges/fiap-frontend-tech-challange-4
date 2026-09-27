import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { PrimaryButtonComponent } from '../primary-button/primary-button';
import { SecondaryButtonComponent } from '../secondary-button/secondary-button';
import { ConfirmDialogData } from './confirm-dialog.models';

@Component({
  selector: 'se-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, PrimaryButtonComponent, SecondaryButtonComponent],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent, boolean>);
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
