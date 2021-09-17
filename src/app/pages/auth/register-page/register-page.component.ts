import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/auth/account.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public submitted = false;

  public message: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.accountService
      .register({
        ...this.form.value,
        id: Date.now(),
        role: 'user',
        token: 'thisisveryrealtoken',
      })
      .subscribe((data) => {
        this.router.navigate(['menu/burger']);
      });
    // this.accountService
    //   .register(this.form.value)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       this.alertService.success('Registration successful', {
    //         keepAfterRouteChange: true,
    //       });
    //       this.router.navigate(['../login'], { relativeTo: this.route });
    //     },
    //     (error) => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     }
    //   );
  }
}
