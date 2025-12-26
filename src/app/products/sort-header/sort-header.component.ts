import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-header',
  templateUrl: './sort-header.component.html',
  styleUrl: './sort-header.component.css'
})
export class SortHeaderComponent {


  ngOnInit(): void {
     
  }
@Input() sortBy: string = 'featured';
@Input() itemToShow: number = 10;
 @Input() pageItem!: number;
readonly sortOptions: number[] = [10,20,30,50,100];
readonly featuredOptions: any[] = [
  {
    name: 'Price: High to Low',
    value: 'price_htl',
  },
  {
    name: 'Price: Low to High',
    value: 'price_lth',
  },
  {
    name: 'Featured',
    value: 'featured',
  },
  {
    name: 'Rating',
    value: 'rating',
  },
  {
    name: 'Newest',
    value: 'newest',
  },
];

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
    itemToShow: this.itemToShow,
    pageItem: this.pageItem
   };
   this.sortHeaderChanges.emit(SortFilter);
}
}
