import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { DisclaimerComponent } from '../shared/disclaimer/disclaimer.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, RouterModule, DisclaimerComponent],
  template: `
    <div *ngIf="article" class="article-container">
      <h2>{{ article.title }}</h2>
      <p><strong>Categoría:</strong> {{ article.category }}</p>
      <div class="content">
        <h3>Contenido:</h3>
        <p>{{ article.content }}</p>
      </div>
      <div class="tags">
        <h3>Tags:</h3>
        <ul>
          <li *ngFor="let tag of article.tags">{{ tag }}</li>
        </ul>
      </div>
      <div class="observations">
        <h3>Observaciones:</h3>
        <p>{{ article.observations }}</p>
      </div>
      <div class="related-regulations">
        <h3>Normativa relacionada:</h3>
        <ng-container *ngIf="relatedRegulationId !== undefined; else plainText">
          <a [routerLink]="['/articulo', relatedRegulationId]">
            {{ article.relatedRegulations }}
          </a>
        </ng-container>
        <ng-template #plainText>
          <p>{{ article.relatedRegulations }}</p>
        </ng-template>
      </div>
      <div class="navigation-buttons">
        <button (click)="goBack()" class="back-button">Atrás</button>
        <a routerLink="/" class="home-button">Volver al buscador</a>
      </div>
    </div>
    <app-disclaimer></app-disclaimer>
  `,
  styles: [`
    .article-container {
      background-color: white;
      padding: 20px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 {
      color: #003366;
    }
    h3 {
      color: #005599;
    }
    .content, .tags, .observations, .related-regulations {
      margin-bottom: 20px;
    }
    ul {
      padding-left: 20px;
    }
    .navigation-buttons {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    .back-button, .home-button {
      display: inline-block;
      padding: 10px 15px;
      background-color: #003366;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }
    .back-button:hover, .home-button:hover {
      background-color: #004488;
    }
  `]
})
export class ArticleComponent implements OnInit {
  article: Article | undefined;
  relatedRegulationId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.article = this.articleService.getArticleById(id);
      if (this.article && this.article.relatedRegulations) {
        this.relatedRegulationId = this.articleService.getRegulationId(this.article.relatedRegulations);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}