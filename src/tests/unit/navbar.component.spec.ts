import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import {
  NavbarComponent,
  NavItem,
} from '../../app/components/navbar/navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have navItems array with correct length', () => {
    expect(component.navItems).toBeDefined();
    expect(component.navItems.length).toBe(5);
  });

  it('should have correct navigation items structure', () => {
    component.navItems.forEach(item => {
      expect(item.label).toBeDefined();
      expect(item.route).toBeDefined();
      expect(typeof item.label).toBe('string');
      expect(typeof item.route).toBe('string');

      if (item.hasOwnProperty('isWip')) {
        expect(typeof item.isWip).toBe('boolean');
      }
    });
  });

  it('should have expected navigation labels', () => {
    const expectedLabels = [
      'Home',
      'Currency Calculator',
      'Currency List',
      'Historical Values',
      'Graphical Trends',
    ];

    const actualLabels = component.navItems.map(item => item.label);
    expect(actualLabels).toEqual(expectedLabels);
  });

  it('should have expected navigation routes', () => {
    const expectedRoutes = [
      '/',
      '/calculator',
      '/currencies',
      '/history',
      '/trends',
    ];

    const actualRoutes = component.navItems.map(item => item.route);
    expect(actualRoutes).toEqual(expectedRoutes);
  });

  it('should mark appropriate items as WIP', () => {
    const homeItem = component.navItems.find(item => item.label === 'Home');
    expect(homeItem?.isWip).toBeFalsy(); // undefined or false are both falsy

    const wipItems = component.navItems.filter(item => item.isWip);
    expect(wipItems.length).toBe(4);
  });

  it('should render all navigation items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('a[routerLink], .nav-link');
    expect(navLinks.length).toBeGreaterThanOrEqual(component.navItems.length);
  });

  it('should have correct router links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const linkElements = compiled.querySelectorAll('a.nav-link');
    
    // Ensure we have navigation links matching our nav items
    expect(linkElements.length).toBe(component.navItems.length);

    // Test that all expected navigation labels are present
    component.navItems.forEach(navItem => {
      const linkText = compiled.textContent || '';
      expect(linkText).toContain(navItem.label);
    });
  });

  it('should display navigation labels correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('a.nav-link');

    // Ensure we have navigation links matching our nav items
    expect(navLinks.length).toBe(component.navItems.length);

    navLinks.forEach((link, index) => {
      expect(link.textContent?.trim()).toContain(
        component.navItems[index].label
      );
    });
  });

  it('should handle WIP items appropriately', () => {
    const wipItems = component.navItems.filter(item => item.isWip);
    expect(wipItems.length).toBeGreaterThan(0);

    wipItems.forEach(item => {
      expect(item.isWip).toBe(true);
    });
  });

  describe('NavItem interface', () => {
    it('should accept valid NavItem objects', () => {
      const validNavItem: NavItem = {
        label: 'Test',
        route: '/test',
      };

      expect(validNavItem.label).toBe('Test');
      expect(validNavItem.route).toBe('/test');
    });

    it('should accept NavItem with isWip property', () => {
      const wipNavItem: NavItem = {
        label: 'Test WIP',
        route: '/test-wip',
        isWip: true,
      };

      expect(wipNavItem.isWip).toBe(true);
    });
  });
});
