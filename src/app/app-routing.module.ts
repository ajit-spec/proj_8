import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./components/app-module/register/register.component";
import {LoginComponent} from "./components/app-module/login/login.component";
import {Guard1Guard} from "./guards/guard1.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'checklist',
    loadChildren: () => import('./modules/checklist/checklist.module').then(m => m.ChecklistModule),
    canActivate: [Guard1Guard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
