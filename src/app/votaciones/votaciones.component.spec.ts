import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotacionesComponent } from './votaciones.component';

describe('LinkComponent', () => {
  let component: VotacionesComponent;
  let fixture: ComponentFixture<VotacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
