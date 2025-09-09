import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from 'src/app/components/home/home.component';

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

  it('should have 5 features', () => {
    expect(component.features).toBeDefined();
    expect(component.features.length).toEqual(5);
  });

  it('should have features with required properties', () => {
    component.features.forEach((feature: any) => {
      expect(feature.icon).toBeDefined();
      expect(feature.title).toBeDefined();
      expect(feature.description).toBeDefined();
      expect(typeof feature.icon).toBe('string');
      expect(typeof feature.title).toBe('string');
      expect(typeof feature.description).toBe('string');
    });
  });

  it('should have the correct feature titles', () => {
    const expectedTitles = [
      'Daily Updated Exchange Rates (WIP)',
      '30 Major World Currencies (WIP)',
      'Instant Conversion (WIP)',
      'Exchange Rate History (WIP)',
      'Interactive Currency Graphs (WIP)'
    ];

    const actualTitles = component.features.map((feature: any) => feature.title);
    expect(actualTitles).toEqual(expectedTitles);
  });

  it('should have the correct feature icons', () => {
    const expectedIcons = ['💱', '🌍', '🔄', '📊', '📈'];
    const actualIcons = component.features.map((feature: any) => feature.icon);
    expect(actualIcons).toEqual(expectedIcons);
  });
});
