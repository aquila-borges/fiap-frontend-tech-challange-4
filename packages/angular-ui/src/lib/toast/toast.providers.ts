import { EnvironmentProviders } from '@angular/core';
import { provideToastr } from 'ngx-toastr';

/** Ships the design system's default toast config (position, timeout, dedupe). */
export function provideToastNotifications(): EnvironmentProviders {
  return provideToastr({
    positionClass: 'toast-bottom-right',
    timeOut: 4000,
    preventDuplicates: true,
  });
}
