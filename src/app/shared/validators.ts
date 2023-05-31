import { AbstractControl } from "@angular/forms";

export function matchValidator(control: AbstractControl) {
  const password: string = control.get('passwordControl')?.value;
  const confirmPassword: string = control.get('repeatPasswordControl')?.value;
  if (!confirmPassword?.length) {
    return null;
  }
  if (password !== confirmPassword) {
    control.get('repeatPasswordControl')?.setErrors({ 'doesNotMatch': true })
    return { matchValidator: { message: 'Passwords should match!' } }
  }
  return null
}

export function minLengthValidator(number: number) {
  return function(formControl: AbstractControl) {
    if (formControl.value.length < number) {
      return { myValidator: { message: `Test value shouldnt be less than ${number} symbols` } }
    }
    return null;
  }
}

