import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMainPageComponent } from './app-main-page/app-main-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppMainPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
