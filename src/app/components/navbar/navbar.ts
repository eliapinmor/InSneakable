import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, Route } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  user$;

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.user$ = this.auth.user$;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
