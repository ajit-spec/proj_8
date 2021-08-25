import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service3Service} from "../../../services/service3.service";
import {Service2Service} from "../../../services/service2.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {

  constructor(
    public formbuilder: FormBuilder,
    public service3: Service3Service,
    public service2: Service2Service,
    public spinner: NgxSpinnerService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
  }

  form = this.formbuilder.group(
    {
      name: [
        '',
        Validators.compose([Validators.required])
      ]
    }
  )

  checktlists: any
  isedit = false
  checklist_id = null

  get_form_control(): any {
    return this.form.controls
  }

  get_errmsg_for_name(): any {
    const name = this.get_form_control().name;
    if (name.hasError('required')) {
      return 'name is req'
    }
  }

  ngOnInit(): void {
    this.get_checklist()

    this.activatedRoute.queryParams.subscribe(value => {
      if (value.checklist_id) {
        this.checklist_id = value.checklist_id
        this.isedit = true
        this.get_single_checklist(this.checklist_id)
      }
    })

  }

  get_checklist(): void {
    this.spinner.show()
    this.service3.get_checklist().subscribe(value => {
      this.spinner.hide()
      // this.checktlists = value.data
      this.checktlists = [...value.data.filter((value: any) => !value.iscompleted), ...value.data.filter((value: any) => value.iscompleted)]
    })
  }

  get_single_checklist(checklist_id: any): void {
    this.spinner.show()
    this.service3.get_single_checklist(checklist_id).subscribe(value => {
      this.spinner.hide()
      this.form.patchValue(
        {
          name: value.data.name
        }
      )
    })
  }

  edit_checklist(ev: any): void {
    this.checklist_id = ev.checklist_id
    this.router.navigate(['/', 'checklist'], {queryParams: {checklist_id: this.checklist_id}})
    this.isedit = true
    this.get_single_checklist(this.checklist_id)
  }

  delete_checklist(ev: any): void {
    this.spinner.show()
    this.service3.delete_checklist(ev.checklist_id).subscribe(value => {
      if (value.status === 1) {
        this.spinner.hide()
        this.service2.openSnackBar(value.msg)
        this.get_checklist()
      }
    })
  }

  submit(): void {

    const request = {
      name: this.form.get('name')?.value
    }

    this.spinner.show()

    if (this.isedit) {
      this.service3.edit_checklist(request, this.checklist_id).subscribe(value => {
        this.spinner.hide()
        this.service2.openSnackBar(value.msg)
        this.get_checklist()
        this.resetform()
      })
    } else {
      this.service3.add_checklist(request).subscribe(value => {
        this.spinner.hide()
        this.service2.openSnackBar(value.msg)
        this.get_checklist()
      })
    }
    this.resetform()
  }


  resetform(): void {
    this.form.reset()
    this.router.navigate(['/', 'checklist'])
    this.isedit = false
  }

}
