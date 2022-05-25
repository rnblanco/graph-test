import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class TemplateService {
	
	constructor(
		protected readonly http: HttpClient
	) {}
	
	get(url): Observable<any> {
		return this.http.get<any>(url).pipe(
			catchError(err => {
				return throwError(err);
			})
		);
	}
}
