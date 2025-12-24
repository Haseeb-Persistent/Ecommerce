import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {
 @Input() rating: number = 0;

 ngOnInit() {
  this.rating = this.rating >5? 5: Math.round(this.rating);   
}
}
