import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  @Input() totalItems: number;
  @Output() pageChanged = new EventEmitter<number>();

  totalPages: number;
  pages: number[];

  ngOnChanges() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.totalPages)
      this.pages = Array(this.totalPages)
        .fill(0)
        .map((x, i) => i + 1);
  }

  selectPage(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.selectPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.selectPage(this.currentPage + 1);
    }
  }
}
