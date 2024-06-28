import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { AuthGuard } from './authGuard/auth.guard';
import { DefaultLayoutComponent } from './containers/default-layout.component';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
  path: '',
  component: CalculatorComponent,
  data: {
    title: 'Calculator'
  }
},
{
  path: 'Calculator',
  component: CalculatorComponent,
  data: {
    title: 'Calculator'
  }
},
{
  path: 'login',
  component: LoginComponent,
  data: {
    title: 'Login Page'
  }
},
{
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
