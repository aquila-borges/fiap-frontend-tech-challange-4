import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PrimaryButtonComponent, SecondaryButtonComponent } from '@safeexpenses/angular-ui';

@Component({
  selector: 'app-configurations-dialog',
  standalone: true,
  imports: [MatDialogModule, MatSlideToggleModule, PrimaryButtonComponent, SecondaryButtonComponent],
  templateUrl: './configurations-dialog.html',
  styleUrl: './configurations-dialog.css',
})
export class ConfigurationsDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ConfigurationsDialogComponent>);

  onWelcomeBannerChange(_checked: boolean): void {
    // placeholder until settings are persisted
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close();
  }
}
