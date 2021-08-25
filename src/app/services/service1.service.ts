import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  constructor() {
  }

  check_valid_email(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(email)) {
      return (
        {
          not_valid_email: true
        }
      )
    }
    return null
  }

  check_valid_password(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
    if (!regex.test(password)) {
      return (
        {
          not_valid_password: true
        }
      )
    }
    return null
  }

}
