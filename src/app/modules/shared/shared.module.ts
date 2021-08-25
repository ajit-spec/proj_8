import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ]
})
export class SharedModule {
}
