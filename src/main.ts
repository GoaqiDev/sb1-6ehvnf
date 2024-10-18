import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { ArticleComponent } from './app/article/article.component';
import { DisclaimerComponent } from './app/shared/disclaimer/disclaimer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DisclaimerComponent],
  template: `
    <div class="container">
      <h1>Biblioteca Policial de Andalucía</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    h1 {
      color: #003366;
      text-align: center;
    }
  `]
})
export class App {}

const routes = [
  { path: '', component: HomeComponent },
  { path: 'articulo/:id', component: ArticleComponent }
];

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});