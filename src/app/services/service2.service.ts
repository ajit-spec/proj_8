import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class Service2Service {

  constructor(
    public snackbar: MatSnackBar
  ) {
  }

  openSnackBar(msg: string) {
    this.snackbar.open(msg, 'OK', {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 2000
    });
  }

}
