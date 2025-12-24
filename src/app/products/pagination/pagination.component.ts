import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent   {


  @Input() pageItemS = 240;  // total items
  @Input() pageSize = 20;     // items per page
  @Input() currentPage = 0;   // 0-based index
  @Output() pageChanged = new EventEmitter<number>();

  totalPages(): number {
    return Math.ceil(this.pageItemS / this.pageSize);
  }

  getPaginationArray(): (number | string)[] {
    const total = this.totalPages();
    const pages: (number | string)[] = [];
    const maxButtons = 7; 
    if (total <= maxButtons) {
      for (let i = 0; i < total; i++) pages.push(i);
      return pages;
    }
    pages.push(0);
    if (this.currentPage > 3) pages.push('...');
    let start = Math.max(1, this.currentPage - 1);
    let end = Math.min(total - 2, this.currentPage + 1);
    if (this.currentPage <= 3) {
      start = 1;
      end = 4;
    }
    if (this.currentPage >= total - 4) {
      start = total - 5;
      end = total - 2;
    }

    for (let i = start; i <= end; i++) pages.push(i);

    if (this.currentPage < total - 4) pages.push('...');
    pages.push(total - 1);

    return pages;
  }
isNumber(value: any): value is number {
  return typeof value === 'number';
}

getLabel(page: number | string) {
  return this.isNumber(page) ? page + 1 : page;
}


  
goToPage(page: number | string) {
  if (typeof page === 'number') {
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }
}

  prevPage() {
    if (this.currentPage > 0) this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages() - 1) this.goToPage(this.currentPage + 1);
  }
}
