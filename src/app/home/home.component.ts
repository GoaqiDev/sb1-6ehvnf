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
    <div class="ad-space">
      <!-- Espacio para el anuncio de Google AdSense -->
      <p>Anuncio de Google AdSense</p>
    </div>
  `,
  styles: [`
    .search-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }
    .search-input, .category-select, .search-button {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .search-button {
      background-color: #003366;
      color: white;
      border: none;
      cursor: pointer;
    }
    .search-button:hover {
      background-color: #004488;
    }
    .results-container {
      display: grid;
      gap: 20px;
      margin-bottom: 60px; /* Espacio para el anuncio fijo */
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
    .ad-space {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: #f0f0f0;
      padding: 10px;
      text-align: center;
      border-top: 1px solid #ccc;
    }
    @media (min-width: 768px) {
      .search-container {
        flex-direction: row;
      }
      .search-input {
        flex-grow: 1;
      }
      .category-select, .search-button {
        width: auto;
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
