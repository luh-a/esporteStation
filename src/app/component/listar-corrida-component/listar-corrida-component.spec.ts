import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarCorridaComponent } from './listar-corrida-component';

describe('ListarCorridaComponent', () => {
  let component: ListarCorridaComponent;
  let fixture: ComponentFixture<ListarCorridaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCorridaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarCorridaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
