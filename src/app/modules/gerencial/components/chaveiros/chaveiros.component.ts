import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chaveiros',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './chaveiros.component.html',
  styleUrls: ['./chaveiros.component.scss']
})
export class ChaveirosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
