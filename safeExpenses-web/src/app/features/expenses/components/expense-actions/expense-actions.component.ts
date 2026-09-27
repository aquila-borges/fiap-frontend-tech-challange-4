import { Component, input, output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IconButtonComponent } from '@safeexpenses/angular-ui';

@Component({
  selector: 'app-expense-actions',
  imports: [IconButtonComponent, MatCheckboxModule],
  templateUrl: './expense-actions.component.html',
  styleUrl: './expense-actions.component.css',
})
export class ExpenseActionsComponent {
  readonly selectedCount = input<number>(0);
  readonly allSelected = input<boolean>(false);
  readonly partiallySelected = input<boolean>(false);
  readonly addExpense = output<void>();
  readonly selectAllToggle = output<boolean>();
  readonly consolidateSelected = output<void>();
  readonly unconsolidateSelected = output<void>();
  readonly deleteSelected = output<void>();
}
