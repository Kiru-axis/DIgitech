import { Component } from '@angular/core';
import { CategoriesDb } from './data';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories = CategoriesDb;
}
