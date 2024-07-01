
import { Component } from '@angular/core';
import { HashTableService } from '../hash-table.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  key: string = '';
  message: string = '';

  constructor(private hashTableService: HashTableService) {}

  addKey(): void {
    this.hashTableService.add(this.key);
    this.message = `Added key: ${this.key}`;
    this.key = '';
  }

  removeKey(): void {
    this.hashTableService.remove(this.key);
    this.message = `Removed key: ${this.key}`;
    this.key = '';
  }

  checkKey(): void {
    const contains = this.hashTableService.contains(this.key);
    this.message = contains ? `Hash table contains key: ${this.key}` : `Hash table does not contain key: ${this.key}`;
    this.key = '';
  }

  displayTable(): void {
    this.hashTableService.display().subscribe((tableString) => {
      this.message = tableString;
    });
  }

  getTableSize(): void {
    this.message = `Hash table size: ${this.hashTableService.getTableSize()}`;
  }
}
