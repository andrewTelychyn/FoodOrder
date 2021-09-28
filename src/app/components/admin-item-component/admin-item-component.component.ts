import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-item-component',
  templateUrl: './admin-item-component.component.html',
  styleUrls: ['./admin-item-component.component.scss'],
})
export class AdminItemComponentComponent implements OnInit {
  @Input() item: any;
  @Input() func!: (item: any) => void;

  constructor() {}

  ngOnInit(): void {}
}
