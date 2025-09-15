import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from '../../app/app.component';
import { HomeComponent } from '../../app/components/home/home.component';

// Mock components for routes that don't exist yet
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

describe('App Routing Integration', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
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

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create app with routing', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home route', async () => {
    await router.navigate(['/']);
    fixture.detectChanges();
    await fixture.whenStable();
    // In Angular tests, navigating to root path typically returns empty string
    expect(location.path()).toBe('');
  });

  it('should navigate to calculator route', async () => {
    await router.navigate(['/calculator']);
    expect(location.path()).toBe('/calculator');
  });

  it('should navigate to currencies route', async () => {
    await router.navigate(['/currencies']);
    expect(location.path()).toBe('/currencies');
  });

  it('should navigate to history route', async () => {
    await router.navigate(['/history']);
    expect(location.path()).toBe('/history');
  });

  it('should navigate to trends route', async () => {
    await router.navigate(['/trends']);
    expect(location.path()).toBe('/trends');
  });

  it('should display correct component for home route', async () => {
    await router.navigate(['/']);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-home')).toBeTruthy();
  });

  it('should maintain header and footer across routes', async () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check initial state
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();

    // Navigate to different route
    await router.navigate(['/calculator']);
    fixture.detectChanges();

    // Header and footer should still be present
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });
});
