import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
    HttpEvent
} from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const lang = localStorage.getItem('lang') || 'es';

        req = req.clone({
            setHeaders: {
                'Accept-Language': lang
            }
        });

        return next.handle(req);
    }

}