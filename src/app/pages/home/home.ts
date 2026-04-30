import { Component } from '@angular/core';
import { Banner } from './components/banner/banner';
import { HighlightedProducts } from './components/highlighted-products/highlighted-products';

@Component({
  selector: 'app-home',
  imports: [Banner, HighlightedProducts],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
