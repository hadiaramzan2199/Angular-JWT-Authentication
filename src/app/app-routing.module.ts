import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'home', component: ProfileComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }


