import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { BasketComponent } from './components/basket/basket.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    CategoryPageComponent,
    ModalDialogComponent,
    BasketComponent,
    NavBarComponent,
    OrderPageComponent,
    AdminPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatGridListModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
