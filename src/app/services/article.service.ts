import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: Article[] = [
    {
      id: 1,
      title: 'Normativa sobre licencias de establecimientos',
      content: 'Contenido sobre licencias de establecimientos...',
      category: 'Policía administrativa',
      tags: ['licencias', 'establecimientos'],
      observations: 'Observaciones sobre licencias...',
      relatedRegulations: 'Ley 13/1999, de 15 de diciembre'
    },
    {
      id: 2,
      title: 'Procedimiento de control de alcoholemia',
      content: 'Contenido sobre control de alcoholemia...',
      category: 'Tráfico y Seguridad Vial',
      tags: ['alcoholemia', 'tráfico'],
      observations: 'Observaciones sobre control de alcoholemia...',
      relatedRegulations: 'Real Decreto 1428/2003'
    },
    {
      id: 3,
      title: 'Ley 13/1999, de 15 de diciembre',
      content: 'Contenido de la Ley 13/1999...',
      category: 'Policía administrativa',
      tags: ['ley', 'establecimientos'],
      observations: 'Observaciones sobre la Ley 13/1999...',
      relatedRegulations: ''
    },
    // Añadir más artículos aquí...
  ];

  getArticles(): Article[] {
    return this.articles;
  }

  getArticleById(id: number): Article | undefined {
    return this.articles.find(article => article.id === id);
  }

  searchArticles(query: string, category?: string): Article[] {
    return this.articles.filter(article => {
      const matchesQuery = article.title.toLowerCase().includes(query.toLowerCase()) ||
                           article.content.toLowerCase().includes(query.toLowerCase()) ||
                           article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory = !category || article.category === category;
      return matchesQuery && matchesCategory;
    });
  }

  getRegulationId(regulation: string): number | undefined {
    const article = this.articles.find(article => article.title === regulation);
    return article ? article.id : undefined;
  }
}