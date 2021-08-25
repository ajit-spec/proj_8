import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service1Service} from "../../../services/service1.service";
import {Router} from "@angular/router";
import {Service3Service} from "../../../services/service3.service";
import {Service2Service} from "../../../services/service2.service";
import {Service4Service} from "../../../services/service4.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public formbuilder: FormBuilder,
    public service1: Service1Service,
    public router: Router,
    public service3: Service3Service,
    public service2: Service2Service,
    public service4: Service4Service
  ) {
  }

  form = this.formbuilder.group(
    {
      email: [
        '',
        Validators.compose([Validators.required, this.service1.check_valid_email])
      ],
      password: [
        '',
        Validators.compose([Validators.required])
      ]
    }
  )

  get_form_control(): any {
    return this.form.controls
  }

  get_errmsg_for_email(): any {
    const email = this.get_form_control().email
    if (email.hasError('required')) {
      return 'email is req';
    }
  }

  get_errmsg_for_password(): any {
    const password = this.get_form_control().password
    if (password.hasError('required')) {
      return 'password is req';
    } else if (password.hasError('not_valid_password')) {
      return 'password must be min 8 characters long and must contain uppercase, lowercase, digit and special character';
    }
  }

  ngOnInit(): void {
    if (this.service4.isauthenticated()) {
      this.router.navigate(['/', 'checklist'])
    }
  }

  submit(): void {

    const request = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }

    this.service3.login(request).subscribe(value => {
      this.service2.openSnackBar(value.msg)
      if (value.status === 1) {
        setTimeout(() => {
          this.service4.store_jwt(value.token)
          this.router.navigate(['/', 'checklist'])
        }, 3000)
      }
    })

  }


}
