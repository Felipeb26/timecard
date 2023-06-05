import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PontoComponent } from './pages/ponto/ponto.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { AuthGuard } from './services/shared/auth.guard';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", pathMatch: "full", redirectTo: "" },
  { path: "ponto", component: PontoComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "contato", component: ContatoComponent },
  { path: "user", component: UserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
