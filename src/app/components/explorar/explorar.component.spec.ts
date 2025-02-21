import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExplorarComponent } from './explorar.component';
import { MangaService } from '../../services/manga-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para simular peticiones HTTP

describe('ExplorarMangasComponent', () => {
  let component: ExplorarComponent;
  let fixture: ComponentFixture<ExplorarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Se necesita para realizar pruebas con peticiones HTTP
      declarations: [ExplorarComponent],
      providers: [MangaService] // Asegúrate de que el servicio se provee en las pruebas
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
