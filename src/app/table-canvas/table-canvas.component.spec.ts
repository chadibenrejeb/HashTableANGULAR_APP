import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCanvasComponent } from './table-canvas.component';

describe('TableCanvasComponent', () => {
  let component: TableCanvasComponent;
  let fixture: ComponentFixture<TableCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
