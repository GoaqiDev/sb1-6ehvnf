import { Component } from '@angular/core';

@Component({
  selector: 'app-disclaimer',
  standalone: true,
  template: `
    <div class="disclaimer">
      <p>
        La autenticidad de la información proporcionada en este medio de divulgación como una
        interpretación del autor no está garantizada para reproducir exactamente un texto legal
        oficial. Es importante destacar que las interpretaciones aquí presentadas no deben
        contradecir en ningún caso lo establecido en documentos legales oficiales. Este contenido
        tiene un propósito informativo, ofreciendo una perspectiva que busca facilitar la
        comprensión, pero siempre se debe considerar el texto legal como la fuente principal y
        definitiva.
      </p>
    </div>
  `,
  styles: [`
    .disclaimer {
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 15px;
      margin-top: 20px;
      font-size: 14px;
      color: #555;
    }
  `]
})
export class DisclaimerComponent {}