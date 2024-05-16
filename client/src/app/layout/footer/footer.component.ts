import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Icons } from '@app/shared';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [FontAwesomeModule],
})
export class FooterComponent {
  year = new Date().getFullYear();

  icons = Icons;
}
