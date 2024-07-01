
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {TableCanvasComponent} from "./table-canvas/table-canvas.component";  // Ensure this import is present

@Injectable({
  providedIn: 'root'
})
export class HashTableService {
  private apiUrl = 'http://localhost:8082/api/stagehashtable';
  private tableSize = 10;
  private table: Array<string>[] = new Array(this.tableSize).fill(null).map(() => []);

  private tableCanvasComponent!: TableCanvasComponent;

  constructor(private http: HttpClient) { }

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
    this.addKey(key).subscribe(() => {
      const index = this.hashFunction(key);
      if (!this.table[index].includes(key)) {
        this.tableCanvasComponent.startAnimation(key, index);
      }
    });
  }

  remove(key: string): void {
    this.removeKey(key).subscribe(() => {
      const index = this.hashFunction(key);
      const list = this.table[index];
      const lastIndex = list.lastIndexOf(key);
      if (lastIndex !== -1) {
        list.splice(lastIndex, 1);
      }
    });
  }

  contains(key: string): boolean {
    let contains = false;
    this.containsKey(key).subscribe((result) => {
      contains = result;
    });
    return contains;
  }

  display(): Observable<string> {
    return this.displayTable().pipe(
      map((result: string[]) => result.map((bucket, i) => `${i}: ${bucket}`).join('\n'))
    );
  }

  getTableSize(): number {
    let size = 0;
    this.getTableSizeFromBackend().subscribe((result) => {
      size = result;
    });
    return size;
  }

  getTable(): Array<string>[] {
    return this.table;
  }

  addKey(key: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, key);
  }

  removeKey(key: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove`, { body: key });
  }

  containsKey(key: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/contains/${key}`);
  }

  displayTable(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/display`);
  }

  getTableSizeFromBackend(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/size`);
  }
}
