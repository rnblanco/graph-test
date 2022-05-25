import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainPageComponent } from './core/app-main-page/app-main-page.component';
import { NotFoundPageComponent } from './core/not-found-page/not-found-page.component';
import { CoreModule } from './core/core.module';

const routes: Routes = [
  {
    path: '',
    component: AppMainPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
