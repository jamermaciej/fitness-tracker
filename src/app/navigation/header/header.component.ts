import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuth: boolean;
  authSubscription: Subscription;
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(public authService: AuthService) {
    authService.isAuth().subscribe(isAuth => {
      this.isAuth = isAuth;
    });

    this.isAuth = !!localStorage.getItem('isLogged');
  }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
