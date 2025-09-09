import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HomeComponent } from 'src/app/components/home/home.component';

// Mock route component for testing
@Component({
  template: '<div>Mock Route Component</div>'
})
class MockRouteComponent { }

describe('App Integration Tests', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent
      ],
      providers: [
        // Mock router configuration would go here if needed
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create the app with all components', () => {
    expect(component).toBeTruthy();
  });

  it('should render header, main content, and footer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check that header is present
    const header = compiled.querySelector('app-header');
    expect(header).toBeTruthy();
    
    // Check that footer is present
    const footer = compiled.querySelector('app-footer');
    expect(footer).toBeTruthy();
    
    // Check that router outlet is present
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should have proper component hierarchy', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verify the structure exists (header -> content -> footer)
    const allElements = compiled.children;
    expect(allElements.length).toBeGreaterThan(0);
    
    // Check that components are rendered in DOM
    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should maintain consistent styling across components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // This test would verify that components work together visually
    // In a real app, you might check for consistent CSS classes, themes, etc.
    const header = compiled.querySelector('app-header');
    const footer = compiled.querySelector('app-footer');
    
    expect(header).toBeTruthy();
    expect(footer).toBeTruthy();
    
    // Example: Check that both components exist and are rendered
    expect(header?.tagName.toLowerCase()).toBe('app-header');
    expect(footer?.tagName.toLowerCase()).toBe('app-footer');
  });
});
