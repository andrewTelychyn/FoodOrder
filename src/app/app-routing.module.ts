import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthguardService as AuthGuard } from './services/auth/authguard.service';
import { RoleGuardService as RoleGuard } from './services/auth/roleguard.service';

const routes: Routes = [
  { path: '', redirectTo: 'menu/burger', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'menu/:productId', component: CategoryPageComponent },
  { path: 'basket', component: OrderPageComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
