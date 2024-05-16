import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Icons } from '@app/shared';

@Component({
  selector: 'app-product-accordion',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `
    <div class="d-flex flex-column gap-1">
      <div class="accordion" id="shippingReturns">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button d-flex align-items-center gap-2 fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#shippingReturnsCollapse"
              aria-expanded="true"
              aria-controls="shippingReturnsCollapse"
            >
              <fa-icon [icon]="icons.truck"></fa-icon>
              <span>Shipping & Returns</span>
            </button>
          </h2>
          <div
            id="shippingReturnsCollapse"
            class="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#shippingReturns"
          >
            <div class="accordion-body text-gloom">
              {{ text }}
            </div>
          </div>
        </div>
      </div>

      <div class="accordion" id="materials">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button d-flex align-items-center gap-2 fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#materialsCollapse"
              aria-expanded="true"
              aria-controls="materialsCollapse"
            >
              <fa-icon [icon]="icons.mat"></fa-icon>
              <span>Materials</span>
            </button>
          </h2>
          <div
            id="materialsCollapse"
            class="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#materials"
          >
            <div class="accordion-body text-gloom">
              {{ text }}
            </div>
          </div>
        </div>
      </div>

      <div class="accordion" id="dimensions">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button d-flex align-items-center gap-2 fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#dimensionsCollapse"
              aria-expanded="true"
              aria-controls="dimensionsCollapse"
            >
              <fa-icon [icon]="icons.dim"></fa-icon>
              <span>Dimensions</span>
            </button>
          </h2>
          <div
            id="dimensionsCollapse"
            class="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#dimensions"
          >
            <div class="accordion-body text-gloom">
              {{ text }}
            </div>
          </div>
        </div>
      </div>

      <div class="accordion" id="careInstructions">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button d-flex align-items-center gap-2 fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#careInstructionsCollapse"
              aria-expanded="true"
              aria-controls="careInstructionsCollapse"
            >
              <fa-icon [icon]="icons.heart"></fa-icon>
              <span>Care Instructions</span>
            </button>
          </h2>
          <div
            id="careInstructionsCollapse"
            class="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#careInstructions"
          >
            <div class="accordion-body text-gloom">
              {{ text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProductAccordionComponent {
  icons = Icons;

  text = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed culpa eos qui
pariatur tempora ducimus impedit distinctio in voluptate dolorum neque
praesentium, facilis fugiat dignissimos, non nesciunt labore unde accusantium.
  `;
}
