import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './private/user/user.component';
import { AuthServices } from './services/auth.services';

const routes: Routes = [
  {
    path:'', 
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path:'login', 
    component: LoginComponent
  },
  {
    path:'register', 
    component: RegisterComponent
  },
  {
    path:'user',
    children:[{
      path:'',
      component:UserComponent
    },
    {
      path:':id/edit',
      component:UserComponent
    }],
    canActivate:[AuthServices],
    data:{}
  },
  {
    path: '**', 
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
