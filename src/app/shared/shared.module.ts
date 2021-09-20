import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  imports: [CommonModule, MatIconModule, MatGridListModule, AppRoutingModule],
  declarations: [NavBarComponent],
  exports: [NavBarComponent, MatIconModule, MatGridListModule],
})
export class SharedModule {}
