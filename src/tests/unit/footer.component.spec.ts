import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from '../../app/components/footer/footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have current year', () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toBe(currentYear);
  });

  it('should initialize with current year', () => {
    // Test that the component initializes with a reasonable year
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toBe(currentYear);
    expect(component.currentYear).toBeGreaterThan(2020);
    expect(component.currentYear).toBeLessThan(3000);
  });

  it('should display current year in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const yearElement = compiled.querySelector('.year, .copyright');

    // Ensure we have some footer content that includes the year
    const footerText = compiled.textContent || '';
    expect(footerText).toContain(component.currentYear.toString());
  });

  it('should have footer structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footerElement = compiled.querySelector('footer');
    expect(footerElement).toBeTruthy();
  });

  it('should contain copyright information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footerText = compiled.textContent?.toLowerCase();
    expect(footerText).toContain('©');
  });

  it('should be a valid year', () => {
    expect(component.currentYear).toBeGreaterThan(2020);
    expect(component.currentYear).toBeLessThan(3000);
  });
});
