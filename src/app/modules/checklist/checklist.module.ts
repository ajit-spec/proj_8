import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChecklistRoutingModule} from './checklist-routing.module';
import {ChecklistComponent} from '../../components/checklist-module/checklist/checklist.component';
import {SharedModule} from "../shared/shared.module";
import {ChecklistItemComponent} from '../../components/checklist-module/checklist-item/checklist-item.component';


@NgModule({
  declarations: [
    ChecklistComponent,
    ChecklistItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChecklistRoutingModule,
  ]
})
export class ChecklistModule {
}
