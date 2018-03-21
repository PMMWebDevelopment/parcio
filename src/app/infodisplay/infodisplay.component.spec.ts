import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfodisplayComponent } from './infodisplay.component';

describe('InfodisplayComponent', () => {
  let component: InfodisplayComponent;
  let fixture: ComponentFixture<InfodisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfodisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfodisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
