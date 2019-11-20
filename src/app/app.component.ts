import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'amigo';
  loading = false;

  constructor(public authService: AuthService, private router: Router) {
    // Loading progress bar
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
  // Set user UID on init
  ngOnInit() {
    this.authService.setUid();
  }
}
