import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from '../../app/components/home/home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have features array with correct length', () => {
    expect(component.features).toBeDefined();
    expect(component.features.length).toBe(5);
  });

  it('should have correct feature structure', () => {
    component.features.forEach(feature => {
      expect(feature.icon).toBeDefined();
      expect(feature.title).toBeDefined();
      expect(feature.description).toBeDefined();
      expect(typeof feature.icon).toBe('string');
      expect(typeof feature.title).toBe('string');
      expect(typeof feature.description).toBe('string');
    });
  });

  it('should have expected feature titles', () => {
    const expectedTitles = [
      'Daily Updated Exchange Rates (WIP)',
      '30 Major World Currencies (WIP)',
      'Instant Conversion (WIP)',
      'Exchange Rate History (WIP)',
      'Interactive Currency Graphs (WIP)',
    ];

    const actualTitles = component.features.map(f => f.title);
    expect(actualTitles).toEqual(expectedTitles);
  });

  it('should have expected feature icons', () => {
    const expectedIcons = ['💱', '🌍', '🔄', '📊', '📈'];
    const actualIcons = component.features.map(f => f.icon);
    expect(actualIcons).toEqual(expectedIcons);
  });

  it('should render all features in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featureElements = compiled.querySelectorAll('.feature-card');
    expect(featureElements.length).toBe(component.features.length);
  });

  it('should display feature icons correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const iconElements = compiled.querySelectorAll('.feature-icon');

    iconElements.forEach((iconElement, index) => {
      expect(iconElement.textContent?.trim()).toBe(
        component.features[index].icon
      );
    });
  });

  it('should display feature titles correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElements = compiled.querySelectorAll('.feature-title');

    titleElements.forEach((titleElement, index) => {
      expect(titleElement.textContent?.trim()).toBe(
        component.features[index].title
      );
    });
  });
});
