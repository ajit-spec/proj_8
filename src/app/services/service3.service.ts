import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Service4Service} from "./service4.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class Service3Service {

  // API_URL = 'http://localhost:8080'
  API_URL = 'https://xaoyhwmweu.herokuapp.com'

  constructor(
    public http: HttpClient,
    public service4: Service4Service,
    public router: Router
  ) {
  }

  register(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/register`,
      data
    )
  }

  login(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/login`,
      data
    )
  }

  logout(): void {
    this.service4.remove_jwt()
    this.router.navigate(['/'])
  }

  add_checklist(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/add_checklist`,
      data,
      {
        headers: new HttpHeaders(
          {
            authorization: `Bearer ${this.service4.get_jwt()}`
          }
        )
      }
    )
  }

  get_checklist(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/get_checklist`,
      {
        headers: new HttpHeaders(
          {
            authorization: `Bearer ${this.service4.get_jwt()}`
          }
        )
      }
    )
  }

  get_single_checklist(checklist_id: any): Observable<any> {
    return this.http.get(
      `${this.API_URL}/get_single_checklist/${checklist_id}`,
      {
        headers: new HttpHeaders(
          {
            authorization: `Bearer ${this.service4.get_jwt()}`
          }
        )
      }
    )
  }

  edit_checklist(data: any, checklist_id: any): Observable<any> {
    return this.http.put(
      `${this.API_URL}/edit_checklist/${checklist_id}`,
      data,
      {
        headers: new HttpHeaders(
          {
            authorization: `Bearer ${this.service4.get_jwt()}`
          }
        )
      }
    )
  }

  delete_checklist(checklist_id: any): Observable<any> {
    return this.http.delete(
      `${this.API_URL}/delete_checklist/${checklist_id}`,
      {
        headers: new HttpHeaders(
          {
            authorization: `Bearer ${this.service4.get_jwt()}`
          }
        )
      }
    )
  }

  complete_checklist(data: any, checklist_id: any): Observable<any> {
    return this.http.put(
      `${this.API_URL}/complete_checklist/${checklist_id}`,
      data,
      {
        headers: new HttpHeaders(
          {
            authorization: `Bearer ${this.service4.get_jwt()}`
          }
        )
      }
    )
  }


}
