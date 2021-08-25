import { Component, OnInit } from '@angular/core';
import {Service3Service} from "../../../services/service3.service";
import {Service4Service} from "../../../services/service4.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public service3: Service3Service,
    public service4: Service4Service
  ) { }

  ngOnInit(): void {
  }

}
