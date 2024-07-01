import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HashTableService } from './hash-table.service';
import { TableCanvasComponent } from './table-canvas/table-canvas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = " hashtable-gui"
  @ViewChild(TableCanvasComponent) tableCanvasComponent!: TableCanvasComponent;

  constructor(public hashTableService: HashTableService) {}

  ngAfterViewInit() {
    this.hashTableService.setTableCanvasComponent(this.tableCanvasComponent);
  }
}
