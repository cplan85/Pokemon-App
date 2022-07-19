import { TestBed } from '@angular/core/testing';

import { CurrentStatsService } from './current-stats.service';

describe('CurrentStatsService', () => {
  let service: CurrentStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
