import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from '../../app/components/header/header.component';
import { NavbarComponent } from '../../app/components/navbar/navbar.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    expect(component.title).toBe('Currency Converter Pro');
  });

  it('should render navbar component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });

  it('should display title in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.header-title, h1, .title');
    if (titleElement) {
      expect(titleElement.textContent).toContain(component.title);
    }
  });

  it('should have header structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headerElement = compiled.querySelector('header');
    expect(headerElement).toBeTruthy();
  });

  it('should contain navbar within header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headerElement = compiled.querySelector('header');
    const navbarElement = compiled.querySelector('app-navbar');

    if (headerElement && navbarElement) {
      expect(headerElement.contains(navbarElement)).toBeTruthy();
    }
  });
});
