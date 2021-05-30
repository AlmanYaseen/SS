import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router'
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { ApprovestoriesComponent } from './admin/approvestories/approvestories.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PoststoriesComponent } from './user/poststories/poststories.component';
import { ReadstoriesComponent } from './user/readstories/readstories.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'readstories', component: ReadstoriesComponent, canActivate:[AuthGuardService]},
  { path: 'poststories', component: PoststoriesComponent, canActivate: [AuthGuardService] },
  { path: 'approvestories', component: ApprovestoriesComponent, canActivate: [AuthGuardService], data: { hasRole: 'Admin' } },
  { path: 'accessdenied', component: AccessdeniedComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },

];


@NgModule({
 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]  
})
export class AppRoutingModule { }
