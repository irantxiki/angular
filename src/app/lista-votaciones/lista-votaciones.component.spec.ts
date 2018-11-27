import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVotacionesComponent } from './lista-votaciones.component';

describe('ListaVotacionesComponent', () => {
  let component: ListaVotacionesComponent;
  let fixture: ComponentFixture<ListaVotacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaVotacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVotacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
