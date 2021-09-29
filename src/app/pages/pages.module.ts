import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoryPageComponent } from './history-page/history-page.component';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from '../app-routing.module';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    CategoryPageComponent,
    OrderPageComponent,
    HistoryPageComponent,
    UserPageComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    AdminPageComponent,
    CategoryPageComponent,
    OrderPageComponent,
    HistoryPageComponent,
  ],
})
export class PagesModule {}
