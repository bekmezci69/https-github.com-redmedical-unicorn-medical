import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInsideComponent } from './dashboard-inside.component';

describe('DashboardInsideComponent', () => {
  let component: DashboardInsideComponent;
  let fixture: ComponentFixture<DashboardInsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
