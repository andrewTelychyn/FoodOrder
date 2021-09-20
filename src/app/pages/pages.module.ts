import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { ServicesModule } from '../services/services.module';

@NgModule({
  declarations: [AdminPageComponent, CategoryPageComponent, OrderPageComponent],
  imports: [CommonModule, SharedModule, ComponentsModule, ReactiveFormsModule],
  exports: [AdminPageComponent, CategoryPageComponent, OrderPageComponent],
})
export class PagesModule {}
