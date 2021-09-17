import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BasketComponent } from './basket/basket.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [ModalDialogComponent, BasketComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, AppRoutingModule],
  exports: [ModalDialogComponent, BasketComponent],
})
export class ComponentsModule {}
