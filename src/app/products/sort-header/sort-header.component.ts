import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-header',
  templateUrl: './sort-header.component.html',
  styleUrl: './sort-header.component.css'
})
export class SortHeaderComponent {
@Input() sortBy: string = 'Featured';
@Input() itemToShow: number = 10;
readonly sortOptions: number[] = [10,20,30,50,100];
readonly featuredOptions: string[] = ['Price: Low to High', 'Price: High to Low', 'Newest Arrivals', 'Best Sellers'];

@Output() sortHeaderChanges = new EventEmitter<any>();

itemToShowChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  this.itemToShow = Number(value);
  this.applyChanges();
}

sortByChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  this.sortBy = value;
  this.applyChanges();
}

applyChanges(){
   const SortFilter = {
    sortBy: this.sortBy,
    itemToShow: this.itemToShow
   };
   this.sortHeaderChanges.emit(SortFilter);
}
}
