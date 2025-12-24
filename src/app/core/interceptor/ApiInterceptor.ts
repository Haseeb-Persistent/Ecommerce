import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API } from '../Token/baseUrlToken';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(@Inject(BASE_API) private baseApi: string) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    if (request.url.startsWith('http')) {
      return next.handle(request);
    }

    const base = this.baseApi.replace(/\/+$/, '');
    const path = request.url.replace(/^\/+/, '');

    const apiRequest = request.clone({
      url: `${base}/${path}`
    });

    return next.handle(apiRequest);
  }
}

