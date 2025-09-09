import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';

import { HomeComponent } from 'src/app/components/home/home.component';

// Mock currency service for integration testing
@Component({
  standalone: true,
  imports: [HomeComponent],
  template: `
    <app-home></app-home>
  `
})
class TestHostComponent { }

describe('Currency Converter Integration Tests', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Only verify if httpMock exists
    if (httpMock) {
      httpMock.verify();
    }
  });

  it('should display currency converter features', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check that the home component is rendered
    const homeComponent = compiled.querySelector('app-home');
    expect(homeComponent).toBeTruthy();
  });

  it('should show all currency features in the home component', () => {
    const homeComponentInstance = fixture.debugElement.query(
      sel => sel.name === 'app-home'
    )?.componentInstance as HomeComponent;
    
    expect(homeComponentInstance).toBeTruthy();
    expect(homeComponentInstance.features).toBeDefined();
    expect(homeComponentInstance.features.length).toBe(5);
    
    // Verify feature categories are present
    const featureTitles = homeComponentInstance.features.map(f => f.title);
    expect(featureTitles).toContain('Daily Updated Exchange Rates (WIP)');
    expect(featureTitles).toContain('30 Major World Currencies (WIP)');
    expect(featureTitles).toContain('Instant Conversion (WIP)');
  });

  // This test demonstrates how you would test API integration
  // when you implement the actual currency conversion functionality
  it('should be ready for currency API integration', () => {
    // This is a placeholder test showing how you'd test API calls
    // when you implement the actual currency conversion features
    
    const compiled = fixture.nativeElement as HTMLElement;
    const homeComponent = compiled.querySelector('app-home');
    
    expect(homeComponent).toBeTruthy();
    
    // Future: Test actual API calls to frankfurter.dev
    // const req = httpMock.expectOne('https://api.frankfurter.dev/v1/latest');
    // expect(req.request.method).toBe('GET');
    // req.flush({ rates: { USD: 1.1, CHF: 0.95 } });
  });
});
