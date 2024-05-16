import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [],
  template: `
    <nav
      class="breadcrumb bg-white py-2 py-md-3 d-flex align-items-center justify-content-center"
    >
      <a class="breadcrumb-item" routerLink="/">Home</a>
      <span class="breadcrumb-item active" aria-current="page"
        >Privacy Policy</span
      >
    </nav>

    <div class="container seperator">
      <div class="card shadow p-4">
        <div
          class="accordion pb-1 mb-1 border-bottom accordion-flush"
          id="policy-1"
        >
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#policyOne"
                aria-expanded="true"
                aria-controls="policyOne"
              >
                Policy #1
              </button>
            </h2>
            <div
              id="policyOne"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#policy-1"
            >
              <div class="accordion-body">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officiis neque consequatur est necessitatibus impedit itaque
                quas natus. Nulla consectetur sequi voluptatum quam nisi ipsam
                error pariatur, deserunt quod? Commodi, neque?
              </div>
            </div>
          </div>
        </div>

        <div
          class="accordion pb-1 mb-1 border-bottom accordion-flush"
          id="apolicy-1"
        >
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#apolicyOne"
                aria-expanded="true"
                aria-controls="apolicyOne"
              >
                Policy #2
              </button>
            </h2>
            <div
              id="apolicyOne"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#apolicy-1"
            >
              <div class="accordion-body">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officiis neque consequatur est necessitatibus impedit itaque
                quas natus. Nulla consectetur sequi voluptatum quam nisi ipsam
                error pariatur, deserunt quod? Commodi, neque?
              </div>
            </div>
          </div>
        </div>

        <div
          class="accordion pb-1 mb-1 border-bottom accordion-flush"
          id="bpolicy-1"
        >
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#bpolicyOne"
                aria-expanded="true"
                aria-controls="bpolicyOne"
              >
                Policy #3
              </button>
            </h2>
            <div
              id="bpolicyOne"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#bpolicy-1"
            >
              <div class="accordion-body">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officiis neque consequatur est necessitatibus impedit itaque
                quas natus. Nulla consectetur sequi voluptatum quam nisi ipsam
                error pariatur, deserunt quod? Commodi, neque?
              </div>
            </div>
          </div>
        </div>

        <div
          class="accordion pb-1 mb-1 border-bottom accordion-flush"
          id="dpolicy-1"
        >
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#dpolicyOne"
                aria-expanded="true"
                aria-controls="dpolicyOne"
              >
                Policy #4
              </button>
            </h2>
            <div
              id="dpolicyOne"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#dpolicy-1"
            >
              <div class="accordion-body">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officiis neque consequatur est necessitatibus impedit itaque
                quas natus. Nulla consectetur sequi voluptatum quam nisi ipsam
                error pariatur, deserunt quod? Commodi, neque?
              </div>
            </div>
          </div>
        </div>

        <div
          class="accordion pb-1 mb-1 border-bottom accordion-flush"
          id="epolicy-1"
        >
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#epolicyOne"
                aria-expanded="true"
                aria-controls="epolicyOne"
              >
                Policy #5
              </button>
            </h2>
            <div
              id="epolicyOne"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#epolicy-1"
            >
              <div class="accordion-body">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officiis neque consequatur est necessitatibus impedit itaque
                quas natus. Nulla consectetur sequi voluptatum quam nisi ipsam
                error pariatur, deserunt quod? Commodi, neque?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PrivacyComponent {}
