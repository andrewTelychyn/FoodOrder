import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { AuthguardService as AuthGuard } from './services/auth/authguard.service';
import { RoleGuardService as RoleGuard } from './services/auth/roleguard.service';

const routes: Routes = [
  // { path: '', redirectTo: 'menu/drink', pathMatch: 'full' }, //default value -> /login
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/auth/auth-routing.module').then(
        (m) => m.AuthRoutingModule
      ),
  },
  {
    path: 'menu/:productId',
    component: CategoryPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/:typeId',
    component: AdminPageComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'admin/history/:userId',
    component: HistoryPageComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'basket',
    component: OrderPageComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'user' },
  },
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'admin',
  //   component: AdminPageComponent,
  //   canActivate: [RoleGuard],
  // },
  {
    path: 'history',
    component: HistoryPageComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'user' },
  },
  {
    path: '**',
    redirectTo: 'menu/drink',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
