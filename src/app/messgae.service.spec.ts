import { TestBed } from '@angular/core/testing';

import { MessgaeService } from './messgae.service';

describe('MessgaeService', () => {
  let service: MessgaeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessgaeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
