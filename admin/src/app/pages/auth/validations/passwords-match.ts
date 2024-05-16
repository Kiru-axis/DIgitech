import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const confirm_password = form.get('confirm_password');
    const password = form.get('password');

    if (
      password &&
      confirm_password &&
      confirm_password.value !== password.value
    ) {
      confirm_password.setErrors({ pwMatch: true });
      return { pwMatch: true };
    }

    return null;
  };
}
