import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatGridListModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatRadioModule,
    FormsModule,
    FontAwesomeModule,
  ],
  declarations: [NavBarComponent],
  exports: [
    CommonModule,
    NavBarComponent,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatRadioModule,
    FormsModule,
    FontAwesomeModule,
  ],
})
export class SharedModule {}
