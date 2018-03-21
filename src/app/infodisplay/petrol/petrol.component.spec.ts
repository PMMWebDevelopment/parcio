import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrolComponent } from './petrol.component';

describe('PetrolComponent', () => {
  let component: PetrolComponent;
  let fixture: ComponentFixture<PetrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
