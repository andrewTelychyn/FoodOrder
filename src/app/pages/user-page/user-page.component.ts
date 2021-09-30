import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/auth/account.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  public mainForm: FormGroup;
  public passwordForm: FormGroup;
  public submittedMain = false;
  public submittedPassword = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private accoutService: AccountService,
    private router: Router
  ) {
    let user = userService.user.getValue();

    this.mainForm = this.formBuilder.group({
      firstname: [user?.firstname, Validators.required],
      lastname: [user?.lastname, Validators.required],
      username: [user?.username, Validators.required],
    });

    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  public submitMain() {
    this.submittedMain = true;

    if (this.mainForm.invalid) return;

    let oldUserData = this.userService.user.getValue();
    if (
      oldUserData?.firstname == this.mainForm.controls.firstname.value &&
      oldUserData?.lastname == this.mainForm.controls.lastname.value &&
      oldUserData?.username == this.mainForm.controls.username.value
    )
      return this.mainForm.controls.username.setErrors({ same: true });

    let user: User = Object.assign(oldUserData, {
      firstname: this.mainForm.controls.firstname.value.trim(),
      lastname: this.mainForm.controls.lastname.value.trim(),
      username: this.mainForm.controls.username.value.trim(),
    });

    this.userService.updateInfo(user).subscribe(() => {});
  }

  public submitPassword() {
    this.submittedPassword = true;

    if (this.passwordForm.invalid) return;

    let value = this.userService.user.getValue();

    if (this.passwordForm.controls.oldPassword.value !== value?.password)
      return this.passwordForm.controls.oldPassword.setErrors({
        different: true,
      });

    let user: User = Object.assign(value, {
      password: this.mainForm.controls.newPassword.value.trim(),
    });

    this.userService.updateInfo(user).subscribe(() => {});
  }

  public logout() {
    this.accoutService.logout();
    this.router.navigate(['/account/login']);
  }
}
