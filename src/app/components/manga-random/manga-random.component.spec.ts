import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaRandomComponent } from './manga-random.component';

describe('MangaRandomComponent', () => {
  let component: MangaRandomComponent;
  let fixture: ComponentFixture<MangaRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaRandomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
