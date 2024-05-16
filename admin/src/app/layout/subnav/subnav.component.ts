import { Component, OnInit, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subnav',
  standalone: true,
  imports: [RouterLink],
  template: ` <a routerLink="" class="sub-link">One</a> `,
  styles: [
    `
      a {
        display: flex;
        align-content: center;
        justify-content: space-between;
        padding: 0.8rem;
        color: var(--white);
        transition: var(--transition);

        &:hover {
          text-decoration: underline;
          background-color: var(--gray);
        }
      }
    `,
  ],
})
export class SubnavComponent implements OnInit {
  constructor() {}

  subData = input.required<{ routerLink: string; label: string }>();

  ngOnInit(): void {}
}
