import { Injectable } from "@angular/core";
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
	constructor( public router: Router ) { }
	
	intercept (
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError(error => {
				return throwError(error.error);
			})
		);
	}
}
