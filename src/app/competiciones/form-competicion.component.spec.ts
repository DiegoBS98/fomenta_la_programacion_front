import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCompeticionComponent } from './form-competicion.component';

describe('FormCompeticionComponent', () => {
  let component: FormCompeticionComponent;
  let fixture: ComponentFixture<FormCompeticionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCompeticionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCompeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
