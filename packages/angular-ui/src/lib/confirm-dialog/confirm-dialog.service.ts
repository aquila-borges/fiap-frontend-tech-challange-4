import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfirmDialogComponent } from './confirm-dialog';
import { ConfirmDialogData } from './confirm-dialog.models';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private readonly dialog = inject(MatDialog);

  confirm(data: ConfirmDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '480px',
      maxWidth: '92vw',
      autoFocus: false,
      disableClose: true,
      panelClass: 'se-dialog-panel',
      backdropClass: 'se-dialog-backdrop',
      data,
    });

    return dialogRef.afterClosed().pipe(map((result) => !!result));
  }
}
