import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { DisclaimerComponent } from '../shared/disclaimer/disclaimer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DisclaimerComponent],
  template: `
    <div class="search-container">
      <input [(ngModel)]="searchQuery" (ngModelChange)="onInputChange()" placeholder="Buscar..." class="search-input">
      <select [(ngModel)]="selectedCategory" (ngModelChange)="onCategoryChange()" class="category-select">
        <option value="">Todas las categorías</option>
        <option *ngFor="let category of categories" [value]="category">{{ category }}</option>
      </select>
      <button (click)="onSearch()" class="search-button">Buscar</button>
    </div>
    <div class="results-container" *ngIf="showResults">
      <div *ngFor="let article of searchResults" class="result-item">
        <h2><a [routerLink]="['/articulo', article.id]">{{ article.title }}</a></h2>
        <p>{{ article.content.substring(0, 150) }}...</p>
      </div>
    </div>
    <app-disclaimer></app-disclaimer>
  `,
  styles: [`
    .search-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 20px;
    }
    .search-input {
      flex-grow: 1;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      min-width: 200px;
    }
    .category-select {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      min-width: 200px;
    }
    .search-button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #003366;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .search-button:hover {
      background-color: #004488;
    }
    .results-container {
      display: grid;
      gap: 20px;
    }
    .result-item {
      background-color: white;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 {
      margin-top: 0;
    }
    a {
      color: #003366;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    @media (max-width: 768px) {
      .search-container {
        flex-direction: column;
      }
      .search-input, .category-select, .search-button {
        width: 100%;
      }
    }
  `]
})
export class HomeComponent {
  searchQuery: string = '';
  selectedCategory: string = '';
  searchResults: Article[] = [];
  showResults: boolean = false;
  categories: string[] = [
    'Policía administrativa',
    'Tráfico y Seguridad Vial',
    'Seguridad Ciudadana y Extranjería',
    'Penal y Procesal',
    'Menores'
  ];

  constructor(private articleService: ArticleService) {}

  onInputChange() {
    if (this.searchQuery.trim() !== '') {
      this.performSearch();
    } else {
      this.showResults = false;
    }
  }

  onCategoryChange() {
    if (this.searchQuery.trim() !== '') {
      this.performSearch();
    }
  }

  onSearch() {
    if (this.searchQuery.trim() !== '') {
      this.performSearch();
    }
  }

  private performSearch() {
    this.searchResults = this.articleService.searchArticles(this.searchQuery, this.selectedCategory);
    this.showResults = this.searchResults.length > 0;
  }
}