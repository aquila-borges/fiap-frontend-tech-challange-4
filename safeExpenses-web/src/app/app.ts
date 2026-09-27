import { Component, HostListener, inject } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { IconButtonComponent } from '@safeexpenses/angular-ui';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfigurationsDialogComponent } from './features/configurations/configurations-dialog';

@Component({
  selector: 'app-root',
  imports: [IconButtonComponent, MatRippleModule, MatTooltipModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly mobileBreakpoint = 700;
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly loadingPhrases = [
    'Good things take time. Almost there!',
    'Hang tight, we’re working our magic...',
    'Preparing an amazing experience for you.',
    'Great things are on the way. Just a second!',
    'Polishing the pixels...',
    'Summoning the digital spirits...',
  ];

  isSidebarCollapsed = window.innerWidth <= this.mobileBreakpoint;
  isLoading = true;
  loadingPhrase = this.pickLoadingPhrase();

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingPhrase = this.pickLoadingPhrase();
        this.isLoading = true;
      }

      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError ||
        event instanceof RouteConfigLoadEnd
      ) {
        this.isLoading = false;
      }
    });
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth <= this.mobileBreakpoint) {
      this.isSidebarCollapsed = true;
    }
  }

  openConfigurations(): void {
    this.dialog.open(ConfigurationsDialogComponent, {
      width: '720px',
      maxWidth: '92vw',
      autoFocus: false,
    });
  }

  private pickLoadingPhrase(): string {
    const randomIndex = Math.floor(Math.random() * this.loadingPhrases.length);

    return this.loadingPhrases[randomIndex];
  }
}
