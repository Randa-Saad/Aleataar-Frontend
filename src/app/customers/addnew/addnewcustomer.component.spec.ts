import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcustomerComponent } from './addnewcustomer.component';

describe('AddnewcustomerComponent', () => {
  let component: AddnewcustomerComponent;
  let fixture: ComponentFixture<AddnewcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewcustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
