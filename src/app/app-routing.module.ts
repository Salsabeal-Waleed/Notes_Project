import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [

  {path:'' ,redirectTo:'login' , pathMatch: 'full'},
  {path:'login' , component:LoginComponent} ,
  {path:'register' , component:RegisterComponent} ,
  {path:'profile',canActivate:[AuthenticationGuard], component:ProfileComponent} ,
  {path:'**' , component:NotFoundPageComponent} ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
