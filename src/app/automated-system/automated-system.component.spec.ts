import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatedSystemComponent } from './automated-system.component';

describe('AutomatedSystemComponent', () => {
  let component: AutomatedSystemComponent;
  let fixture: ComponentFixture<AutomatedSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomatedSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomatedSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
