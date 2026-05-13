import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogue-search',
  imports: [FormsModule],
  templateUrl: './catalogue-search.html',
  styleUrl: './catalogue-search.css',
})
export class CatalogueSearch {
  searchQuery = input.required<string>();
  searchChange = output<string>();

  onClear() {
    this.searchChange.emit('');
  }

  onChange(value: string) {
    this.searchChange.emit(value);
  }
}