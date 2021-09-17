import { Component, Input, OnInit } from '@angular/core';
import { ProductTypes } from '../../models/product.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  @Input() productType: ProductTypes | undefined;

  constructor() {}
}
