import { Component, input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgStyle } from '@angular/common';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [MatDatepickerModule, NgStyle, ReactiveFormsModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
  providers: [
    provideNativeDateAdapter(),
    { provide: NG_VALUE_ACCESSOR, useExisting: DateComponent, multi: true },
  ],
})
export class DateComponent<T> extends ControlValueAccessorDirective<T> {
  minDate = new Date();

  placeholder = input<string>();

  label = input.required<string>();

  id = input.required<string>();

  labelColor = input<string>();
}
