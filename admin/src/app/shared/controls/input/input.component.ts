import { Component, input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputType } from '../types/controls.type';
import { ControlValueAccessorDirective } from '../directives/control-value-accessor.directive';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  imports: [ReactiveFormsModule, NgStyle],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true },
  ],
})
export class InputComponent<T> extends ControlValueAccessorDirective<T> {
  placeholder = input<string>();

  label = input.required<string>();

  id = input.required<string>();

  type = input<InputType>('text');

  labelColor = input<string>();
}
