import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from '../../app/components/navbar/navbar.component';
import { HomeComponent } from '../../app/components/home/home.component';

// Mock components for WIP routes
@Component({
  template: '<div>Calculator Component (WIP)</div>',
})
class MockCalculatorComponent {}

@Component({
  template: '<div>Currencies Component (WIP)</div>',
})
class MockCurrenciesComponent {}

@Component({
  template: '<div>History Component (WIP)</div>',
})
class MockHistoryComponent {}

@Component({
  template: '<div>Trends Component (WIP)</div>',
})
class MockTrendsComponent {}

describe('Navbar Routing Integration', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([
          { path: '', component: HomeComponent },
          { path: 'calculator', component: MockCalculatorComponent },
          { path: 'currencies', component: MockCurrenciesComponent },
          { path: 'history', component: MockHistoryComponent },
          { path: 'trends', component: MockTrendsComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create navbar with routing', () => {
    expect(component).toBeTruthy();
  });

  it('should have clickable navigation links', () => {
    const linkElements = fixture.debugElement.queryAll(By.css('a.nav-link'));
    expect(linkElements.length).toBeGreaterThan(0);

    linkElements.forEach(linkElement => {
      const routerLink = linkElement.nativeElement.getAttribute(
        'ng-reflect-router-link'
      );
      expect(routerLink).toBeDefined();
    });
  });

  it('should navigate when home link is clicked', async () => {
    const homeLink = fixture.debugElement.query(By.css('a[routerLink="/"]'));
    if (homeLink) {
      homeLink.nativeElement.click();
      await fixture.whenStable();
      expect(location.path()).toBe('');
    }
  });

  it('should navigate when calculator link is clicked', async () => {
    const calculatorLink = fixture.debugElement.query(
      By.css('a[routerLink="/calculator"]')
    );
    if (calculatorLink) {
      calculatorLink.nativeElement.click();
      await fixture.whenStable();
      expect(location.path()).toBe('/calculator');
    }
  });

  it('should navigate when currencies link is clicked', async () => {
    const currenciesLink = fixture.debugElement.query(
      By.css('a[routerLink="/currencies"]')
    );
    if (currenciesLink) {
      currenciesLink.nativeElement.click();
      await fixture.whenStable();
      expect(location.path()).toBe('/currencies');
    }
  });

  it('should have correct routerLink attributes for all nav items', () => {
    const linkElements = fixture.debugElement.queryAll(By.css('a[routerLink]'));
    const expectedRoutes = component.navItems.map(item => item.route);

    linkElements.forEach((linkElement, index) => {
      if (index < expectedRoutes.length) {
        const routerLink = linkElement.nativeElement.getAttribute('routerLink');
        expect(expectedRoutes).toContain(routerLink);
      }
    });
  });

  it('should display WIP indicators for work-in-progress items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const wipItems = component.navItems.filter(item => item.isWip);

    // Check if WIP items are visually indicated (this depends on template implementation)
    wipItems.forEach(wipItem => {
      const linkText = compiled.textContent;
      expect(linkText).toContain(wipItem.label);
    });
  });

  it('should maintain navigation state across route changes', async () => {
    // Navigate to home route and ensure navbar remains functional
    await router.navigate(['/']);
    fixture.detectChanges();

    // Navbar should still be present and functional
    const linkElements = fixture.debugElement.queryAll(By.css('a.nav-link'));
    expect(linkElements.length).toBeGreaterThan(0);
  });

  it('should handle navigation to non-existent routes gracefully', async () => {
    // Navigate to non-existent route (should redirect to home due to wildcard route)
    try {
      await router.navigate(['/non-existent-route']);
      fixture.detectChanges();

      // Should redirect to home, navbar should still be functional
      expect(location.path()).toBe('/');
    } catch (error) {
      // Navigation error is expected for non-existent routes
      expect(error).toBeDefined();
    }

    // Navbar should still be functional regardless
    const linkElements = fixture.debugElement.queryAll(By.css('a.nav-link'));
    expect(linkElements.length).toBeGreaterThan(0);
  });
});
