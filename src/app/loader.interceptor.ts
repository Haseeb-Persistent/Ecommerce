// loader.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoaderService } from './core/Services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) {}

  intercept(req: any, next: any) {
    this.loader.show();
    return next.handle(req).pipe(
      finalize(() => this.loader.hide())
    );
  }
}
