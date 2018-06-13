import {Component, OnInit} from '@angular/core';
import {Location}                 from '@angular/common';

@Component({
  selector: 'dashboard-back',
  templateUrl: './back.html'
})

// only if you absoluetely want the routing switch on search

export class BackComponent {

   constructor(private location: Location) {
  }

  goBack(): void {
    this.location.back();
  }
}
