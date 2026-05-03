import { Component, input } from '@angular/core';

@Component({
  selector: 'app-size-button',
  imports: [],
  templateUrl: './size-button.html',
  styleUrl: './size-button.css',
})
export class SizeButton {
  data = input.required<string>();
  isSelected = input<boolean>(false);
}
