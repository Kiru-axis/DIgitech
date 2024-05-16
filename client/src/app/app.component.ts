import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent, HeaderComponent } from './layout';
import { LoaderComponent } from './shared';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, LoaderComponent],
})
export class AppComponent {}
