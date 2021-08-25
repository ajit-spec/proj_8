import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service1Service} from "../../../services/service1.service";
import {Service3Service} from "../../../services/service3.service";
import {Service2Service} from "../../../services/service2.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public formbuilder: FormBuilder,
    public service1: Service1Service,
    public service3: Service3Service,
    public service2: Service2Service,
    public router: Router
  ) {
  }

  form = this.formbuilder.group(
    {
      name: [
        '',
        Validators.compose([Validators.required])
      ],
      email: [
        '',
        Validators.compose([Validators.required, this.service1.check_valid_email])
      ],
      password: [
        '',
        Validators.compose([Validators.required, this.service1.check_valid_password])
      ]
    }
  )

  get_form_control(): any {
    return this.form.controls
  }

  get_errmsg_for_name(): any {
    const name = this.get_form_control().name
    if (name.hasError('required')) {
      return 'name is req';
    }
  }

  get_errmsg_for_email(): any {
    const email = this.get_form_control().email
    if (email.hasError('required')) {
      return 'email is req';
    } else if (email.hasError('not_valid_email')) {
      return 'email is not valid';
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
  }

  submit(): void {

    const request = {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }

    this.service3.register(request).subscribe(value => {
      this.service2.openSnackBar(value.msg)
      if (value.status === 1) {
        setTimeout(() => {
          this.router.navigate(['/', 'login'])
        }, 3000)
      }
    })

  }

}
