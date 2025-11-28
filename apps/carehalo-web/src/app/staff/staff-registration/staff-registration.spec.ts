import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRegistration } from './staff-registration';

describe('StaffRegistration', () => {
  let component: StaffRegistration;
  let fixture: ComponentFixture<StaffRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
