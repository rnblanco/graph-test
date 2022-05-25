import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TemplateService } from './template.service';

const URL = `${environment.api_url}`;

@Injectable({
	providedIn: 'root'
})
export class CatalogService extends TemplateService {
	
	constructor(protected readonly http: HttpClient) {
		super(http);
	}
	
	getOneByName(url: string) {
		const _url = `${URL}/${url}`;
		return this.get(_url);
	}
}
