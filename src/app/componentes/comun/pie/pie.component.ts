import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: []
})
export class PieComponent implements OnInit {

  anio: number;

  constructor() {
    this.anio = new Date().getFullYear() + 1;
  }

  ngOnInit() {
  }

}
