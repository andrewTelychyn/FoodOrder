import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../models/user.model';

export function prevDataChangeValidator(prevUser: User): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      prevUser?.firstname == control.get('firstname')?.value &&
      prevUser?.lastname == control.get('lastname')?.value &&
      prevUser?.username == control.get('username')?.value
    ) {
      return { same: true };
    }
    return null;
  };
}

export function oldPasswordValidator(oldPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (oldPassword != control.get('oldPassword')?.value)
      return { oldDifferent: true };
    return null;
  };
}

export function newPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      control.get('newPasswordCheck')?.value !=
      control.get('newPassword')?.value
    )
      return { newDifferent: true };
    return null;
  };
}
