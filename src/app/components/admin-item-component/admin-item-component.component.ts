import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CommonAdmimItem,
  CommotAdminUrlType,
} from 'src/app/pages/admin-page/admin-page.component';

@Component({
  selector: 'app-admin-item-component',
  templateUrl: './admin-item-component.component.html',
  styleUrls: ['./admin-item-component.component.scss'],
})
export class AdminItemComponentComponent implements OnInit {
  @Input() item!: CommonAdmimItem;
  @Input() adminType!: CommotAdminUrlType;
  @Output() clickEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  public clickHandler(): void {
    this.clickEmitter.emit();
  }
}
