import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Service2Service} from "../../../services/service2.service";
import {Service3Service} from "../../../services/service3.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss']
})
export class ChecklistItemComponent implements OnInit {

  constructor(
    public service2: Service2Service,
    public service3: Service3Service,
    public router: Router,
  ) {
  }

  @Input('checklist') checklist: any

  @Output('getchecklistevent') getchecklistevent = new EventEmitter()
  @Output('editchecklistevent') editchecklistevent = new EventEmitter()
  @Output('deletechecklistevent') deletechecklistevent = new EventEmitter()

  ngOnInit(): void {
  }

  edit_checklist(): void {
    this.editchecklistevent.emit({checklist_id: this.checklist._id})
  }

  delete_checklist(): void {
    this.deletechecklistevent.emit({checklist_id: this.checklist._id})
  }

  checked(ev: any): void {
    console.log(ev)
    console.log(this.checklist)
    this.service3.complete_checklist({iscompleted: this.checklist.iscompleted}, this.checklist._id).subscribe(value => {
      this.service2.openSnackBar(value.msg)
      this.getchecklistevent.emit()
    })
  }

}
