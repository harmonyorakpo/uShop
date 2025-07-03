import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const globalHeaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const apiKeyReq = req.clone({
    setHeaders: {
      'x-api-key': 'xgrOJ38jjT3y5EtDC4hee68QI6qMxKkuaeAOvn0S',
    },
  });

  return next(apiKeyReq);
};
