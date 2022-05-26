import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMainPageComponent } from './app-main-page/app-main-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { LoadingModule } from '../shared/components/loading/loading.module';
import { ButtonModule } from 'primeng/button';
import { NoDblClickDirective } from '../shared/directives/no-dbl-click.directive';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppMainPageComponent,
    NotFoundPageComponent,
    NoDblClickDirective
  ],
	imports: [
		CommonModule,
		LoadingModule,
		ButtonModule,
		RouterModule,
		ChartModule,
		AccordionModule,
		TableModule
	]
})
export class CoreModule { }
