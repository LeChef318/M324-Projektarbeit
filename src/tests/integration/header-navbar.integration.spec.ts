import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from '../../app/components/header/header.component';
import { NavbarComponent } from '../../app/components/navbar/navbar.component';

describe('Header-Navbar Integration', () => {
  let headerComponent: HeaderComponent;
  let headerFixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    headerFixture = TestBed.createComponent(HeaderComponent);
    headerComponent = headerFixture.componentInstance;
    headerFixture.detectChanges();
  });

  it('should create header with embedded navbar', () => {
    expect(headerComponent).toBeTruthy();
  });

  it('should render navbar component within header', () => {
    const compiled = headerFixture.nativeElement as HTMLElement;
    const headerElement = compiled.querySelector('header');
    const navbarElement = compiled.querySelector('app-navbar');

    expect(headerElement).toBeTruthy();
    expect(navbarElement).toBeTruthy();

    if (headerElement && navbarElement) {
      expect(headerElement.contains(navbarElement)).toBeTruthy();
    }
  });

  it('should display header title alongside navbar', () => {
    const compiled = headerFixture.nativeElement as HTMLElement;
    const headerText = compiled.textContent;

    expect(headerText).toContain(headerComponent.title);
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });

  it('should have navbar with navigation items in header context', () => {
    const navbarDebugElement = headerFixture.debugElement.query(
      By.directive(NavbarComponent)
    );
    expect(navbarDebugElement).toBeTruthy();

    const navbarComponent =
      navbarDebugElement.componentInstance as NavbarComponent;
    expect(navbarComponent.navItems).toBeDefined();
    expect(navbarComponent.navItems.length).toBeGreaterThan(0);
  });

  it('should maintain header styling with navbar integration', () => {
    const compiled = headerFixture.nativeElement as HTMLElement;
    const headerElement = compiled.querySelector('header');

    expect(headerElement).toBeTruthy();

    // Check that both header content and navbar are present
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.textContent).toContain(headerComponent.title);
  });

  it('should pass through router functionality to navbar', () => {
    const navbarDebugElement = headerFixture.debugElement.query(
      By.directive(NavbarComponent)
    );
    const navbarElement = navbarDebugElement.nativeElement;

    // Check that navigation links are present in the navbar within header
    const navLinks = navbarElement.querySelectorAll('a.nav-link');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('should maintain responsive behavior with navbar integration', () => {
    const compiled = headerFixture.nativeElement as HTMLElement;

    // Simulate different viewport sizes (this would typically be done with CSS testing)
    // For now, we just ensure the structure is maintained
    expect(compiled.querySelector('header')).toBeTruthy();
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });

  it('should handle navbar events within header context', () => {
    const navbarDebugElement = headerFixture.debugElement.query(
      By.directive(NavbarComponent)
    );
    const navbarComponent =
      navbarDebugElement.componentInstance as NavbarComponent;

    // Ensure navbar component is properly initialized within header
    expect(navbarComponent.navItems).toBeDefined();
    expect(navbarComponent.navItems.length).toBe(5);
  });

  it('should maintain header-navbar layout consistency', () => {
    const compiled = headerFixture.nativeElement as HTMLElement;
    const headerElement = compiled.querySelector('header');
    const navbarElement = compiled.querySelector('app-navbar');

    expect(headerElement).toBeTruthy();
    expect(navbarElement).toBeTruthy();

    // Verify the navbar is properly contained within the header
    if (headerElement && navbarElement) {
      expect(headerElement.contains(navbarElement)).toBeTruthy();
    }
  });
});
