import { TestBed } from '@angular/core/testing';

import { CompeticionService } from './competicion.service';

describe('CompeticionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompeticionService = TestBed.get(CompeticionService);
    expect(service).toBeTruthy();
  });
});
