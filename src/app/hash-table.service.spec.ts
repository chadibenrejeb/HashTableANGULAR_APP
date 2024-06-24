import { TestBed } from '@angular/core/testing';

import { HashTableService } from './hash-table.service';

describe('HashTableService', () => {
  let service: HashTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
