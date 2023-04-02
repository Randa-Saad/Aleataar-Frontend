import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewproductComponent } from './addnewproduct.component';

describe('AddnewproductComponent', () => {
  let component: AddnewproductComponent;
  let fixture: ComponentFixture<AddnewproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
