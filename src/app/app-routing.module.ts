import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMainPageComponent } from './core/app-main-page/app-main-page.component';
import { NotFoundPageComponent } from './core/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: 'app',
    component: AppMainPageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./core/core.module').then((m) => m.CoreModule)
      },
    ]
  },
  { path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
