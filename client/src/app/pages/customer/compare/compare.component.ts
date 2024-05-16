import { AsyncPipe, CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ICompare, ICreateCompare } from '@app/models';
import { customerActions, selectCompares } from '@app/store/customer';
import { ColorComponent } from '@app/shared';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, ColorComponent, RouterLink, SlicePipe],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.scss',
})
export class CompareComponent implements OnInit {
  store = inject(Store);

  showBreadcrumbs = input<boolean>(true);

  compares$!: Observable<ICompare[] | null | undefined>;

  removeFromCompares(dto: ICreateCompare) {
    this.store.dispatch(customerActions.removeFromCompare({ request: dto }));
  }

  ngOnInit(): void {
    this.store.dispatch(customerActions.getCompares());
    this.compares$ = this.store.select(selectCompares);
  }
}
