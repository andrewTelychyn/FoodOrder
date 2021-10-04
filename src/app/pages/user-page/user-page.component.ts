import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/auth/account.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import {
  newPasswordValidator,
  oldPasswordValidator,
  prevDataChangeValidator,
} from 'src/app/shared/validators/user.validator';

@Component({
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent {
  public mainInfoForm: FormGroup;
  public passwordForm: FormGroup;
  public submittedMain = false;
  public submittedPassword = false;

  public message: string = '';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private accoutService: AccountService,
    private router: Router
  ) {
    let user = userService.user.getValue();

    this.mainInfoForm = this.formBuilder.group(
      {
        firstname: [user?.firstname, Validators.required],
        lastname: [user?.lastname, Validators.required],
        username: [user?.username, Validators.required],
      },
      { validators: prevDataChangeValidator(user!) }
    );

    this.passwordForm = this.formBuilder.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPasswordCheck: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [
          oldPasswordValidator(user?.password!),
          newPasswordValidator(),
        ],
      }
    );
  }

  public setMessage(data: string): void {
    this.message = data;
  }

  public submitMainInfo(): void {
    this.setMessage('');
    this.submittedMain = true;

    if (this.mainInfoForm.invalid) return;
    let oldUserData = this.userService.user.getValue();

    let user: User = Object.assign(oldUserData, {
      firstname: this.mainInfoForm.controls.firstname.value.trim(),
      lastname: this.mainInfoForm.controls.lastname.value.trim(),
      username: this.mainInfoForm.controls.username.value.trim(),
    });

    this.userService.updateInfo(user, this.setMessage.bind(this));
  }

  public submitPassword(): void {
    this.setMessage('');
    this.submittedPassword = true;

    if (this.passwordForm.invalid) return;
    let value = this.userService.user.getValue();

    let user: User = Object.assign(value, {
      password: this.passwordForm.controls.newPassword.value.trim(),
    });

    this.userService.updateInfo(user, this.setMessage.bind(this));
  }

  public logout(): void {
    this.accoutService.logout();
    this.router.navigate(['/account/login']);
  }
}
