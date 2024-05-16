import { CurrencyPipe, SlicePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

import {
  ColorComponent,
  QtyCounterComponent,
  RatingComponent,
} from '@app/shared';
import {
  ICreateCart,
  ICreateCompare,
  ICreateWishlist,
  IProduct,
  IUser,
} from '@app/models';
import { productActions, selectProduct } from '@app/store/products';
import { customerActions } from '@app/store/customer';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { ProductAccordionComponent } from './components/product-accordion/product-accordion.component';
import { ProductReviewFormComponent } from './components/product-review-form/product-review-form.component';
import { selectAuthUser } from '@app/store/auth';
import { ProductsComponent } from '../products/products.component';

//@ts-ignore
var $: any = window['$'];

@Component({
  selector: 'app-single-product',
  standalone: true,
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss',
  imports: [
    CurrencyPipe,
    SlicePipe,
    RouterLink,
    RatingComponent,
    QtyCounterComponent,
    ProductAccordionComponent,
    ProductsComponent,
    ProductReviewFormComponent,
    ColorComponent,
    ProductReviewsComponent,
  ],
})
export class SingleProductComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  // modal = viewChild<ElementRef>('modalId');

  @ViewChild('modal') modal?: ElementRef;

  destroy$ = new Subject();

  product!: IProduct;

  selectedColor = '';

  cartQuantity = 1;

  user!: IUser; //needed to make any review

  ngOnInit(): void {
    this.getCurrentProduct();
    this.getCurrentUser();
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  quantityChanges(qty: number) {
    this.cartQuantity = qty;
  }

  onAddToWishlist(dto: ICreateWishlist) {
    this.store.dispatch(customerActions.addToWishlist({ request: dto }));
  }

  onAddToCompare(dto: ICreateCompare) {
    this.store.dispatch(customerActions.addToCompare({ request: dto }));
  }

  onAddToCart(productId: string, color: string) {
    const request: ICreateCart = {
      productId,
      color: this.selectedColor ? this.selectedColor : color,
      quantity: this.cartQuantity,
    };
    this.store.dispatch(customerActions.addToCart({ request }));
  }

  createReview(e: { star: number; comment: string }) {
    const request = {
      star: Number(e.star),
      comment: e.comment,
      productId: String(this.product.id),
    };

    if (!this.user) {
      this.router.navigateByUrl('auth/login');
      return;
    }

    this.store.dispatch(productActions.createReview({ request }));
    $(this.modal?.nativeElement).modal('hide');
  }

  deleteReview(reviewId: string) {
    this.store.dispatch(productActions.deleteReview({ reviewId }));
    window.location.reload();
  }

  getCurrentProduct() {
    // let productId = '';
    // this.activatedRoute.paramMap
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((d) => (productId = d.get('id') as string));

    // this.store.dispatch(productActions.getSingleProduct({ productId }));

    // this.store
    //   .select(selectProduct)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((data) => {
    //     if (data) {
    //       this.product = data;
    //       console.log(data);
    //     }
    //   });

    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((data) => {
          this.store.dispatch(
            productActions.getSingleProduct({
              productId: String(data.get('id')),
            })
          );
          return this.store.select(selectProduct);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.product = res;
        }
      });
  }

  getCurrentUser() {
    this.store
      .select(selectAuthUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.user = res;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
