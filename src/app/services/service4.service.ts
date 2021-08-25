import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service4Service {

  constructor() {
  }

  store_jwt(token: any): void {
    localStorage.setItem('jwt', JSON.stringify(token))
  }

  get_jwt(): any {
    if (this.isauthenticated()) {
      return JSON.parse(localStorage.getItem('jwt') as string)
    }
  }

  isauthenticated(): Boolean {
    return Boolean(localStorage.getItem('jwt'))
  }

  remove_jwt(): void {
    localStorage.removeItem('jwt')
  }

  getcurr_user(): any {
    return JSON.parse(
      atob(this.get_jwt().split('.')[1])
    )
  }

}
