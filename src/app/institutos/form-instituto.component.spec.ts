import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInstitutoComponent } from './form-instituto.component';

describe('FormInstitutoComponent', () => {
  let component: FormInstitutoComponent;
  let fixture: ComponentFixture<FormInstitutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInstitutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInstitutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
