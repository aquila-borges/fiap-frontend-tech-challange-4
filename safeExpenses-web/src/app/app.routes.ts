import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent() {
      return import('./features/home/home').then((m) => m.HomeComponent);
    },
  },
  {
    path: 'expenses',
    loadComponent() {
      return import('./features/expenses/pages/expenses.component').then(
        (m) => m.ExpensesComponent,
      );
    },
  },
  {
    path: '**',
    loadComponent() {
      return import('./features/not-found/not-found').then((m) => m.NotFoundComponent);
    },
  },
];
