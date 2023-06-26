import { TestBed } from '@angular/core/testing';

import { HttpsourceService } from './httpsource.service';

describe('HttpsourceService', () => {
  let service: HttpsourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpsourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
