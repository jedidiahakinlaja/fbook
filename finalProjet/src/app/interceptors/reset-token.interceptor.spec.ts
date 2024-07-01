import { TestBed } from '@angular/core/testing';

import { ResetTokenInterceptor } from './reset-token.interceptor';

describe('ResetTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ResetTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ResetTokenInterceptor = TestBed.inject(ResetTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
