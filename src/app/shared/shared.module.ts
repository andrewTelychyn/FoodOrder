import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatGridListModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NavBarComponent],
  exports: [
    NavBarComponent,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
