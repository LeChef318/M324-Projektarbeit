import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from 'src/app/components/header/header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toEqual('Currency Converter Pro');
  });

  it('should display the title in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    
    // This test assumes the title is displayed somewhere in the header template
    // You may need to adjust this based on your actual HTML structure
    expect(compiled.textContent).toContain('Currency Converter Pro');
  });
});
