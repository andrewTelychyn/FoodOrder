import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { BasketComponent } from './basket/basket.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminProductComponent } from './admin-modal-dialog/admin-product/admin-product.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminCategoryComponent } from './admin-modal-dialog/admin-category/admin-category.component';
import { AdminIngredientComponent } from './admin-modal-dialog/admin-ingredient/admin-ingredient.component';

@NgModule({
  declarations: [
    ModalDialogComponent,
    BasketComponent,
    AdminProductComponent,
    AdminCategoryComponent,
    AdminIngredientComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    MatDialogModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ModalDialogComponent, BasketComponent, AdminProductComponent],
})
export class ComponentsModule {}
