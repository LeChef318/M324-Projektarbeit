import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  route: string;
  isWip?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navItems: NavItem[] = [
    { label: 'Home', route: '/' },
    { label: 'Currency Calculator', route: '/calculator', isWip: true },
    { label: 'Currency List', route: '/currencies', isWip: true },
    { label: 'Historical Values', route: '/history', isWip: true },
    { label: 'Graphical Trends', route: '/trends', isWip: true },
  ];
}
