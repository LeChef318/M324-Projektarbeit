import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from 'src/app/components/footer/footer.component';

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

  it('should have the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toEqual(currentYear);
  });

  it('should display the current year in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const currentYear = new Date().getFullYear();
    fixture.detectChanges();
    
    // This test assumes the year is displayed somewhere in the footer template
    // You may need to adjust this based on your actual HTML structure
    expect(compiled.textContent).toContain(currentYear.toString());
  });
});
