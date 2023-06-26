import { TestBed } from '@angular/core/testing';

import { EventsourceService } from './eventsource.service';

describe('EventsourceService', () => {
  let service: EventsourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
