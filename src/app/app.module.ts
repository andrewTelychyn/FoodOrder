import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { AuthModule } from './pages/auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/main.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product/product.effects';
import { CategoriesEffects } from './store/category/category.effects';
import { IngredientEffects } from './store/ingredient/ingredient.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ComponentsModule,
    AuthModule,
    PagesModule,
    SharedModule,
    HttpClientModule,

    StoreModule.forRoot({ main: reducer }, {}),

    EffectsModule.forRoot([
      ProductEffects,
      CategoriesEffects,
      IngredientEffects,
    ]),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
