import { Injectable } from '@angular/core';
import { TableCanvasComponent } from './table-canvas/table-canvas.component';

@Injectable({
  providedIn: 'root'
})
export class HashTableService {
  private tableSize = 10;
  private table: Array<string>[] = new Array(this.tableSize).fill(null).map(() => []);

  private tableCanvasComponent!: TableCanvasComponent;

  setTableCanvasComponent(tableCanvasComponent: TableCanvasComponent) {
    this.tableCanvasComponent = tableCanvasComponent;
  }

  hashFunction(key: string): number {
    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue = (hashValue + key.charCodeAt(i)) * 31;
    }
    return Math.abs(hashValue % this.tableSize);
  }

  add(key: string): void {
    const index = this.hashFunction(key);
    if (!this.table[index].includes(key)) {
      this.tableCanvasComponent.startAnimation(key, index);
    }
  }

  remove(key: string): void {
    const index = this.hashFunction(key);
    const list = this.table[index];
    const lastIndex = list.lastIndexOf(key);
    if (lastIndex !== -1) {
      list.splice(lastIndex, 1);
    }
  }

  contains(key: string): boolean {
    const index = this.hashFunction(key);
    return this.table[index].includes(key);
  }

  display(): string {
    return this.table.map((bucket, i) => `${i}: ${bucket.join(', ')}`).join('\n');
  }

  getTableSize(): number {
    return this.table.reduce((sum, bucket) => sum + bucket.length, 0);
  }

  getTable(): Array<string>[] {
    return this.table;
  }
}
