import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { StudentRoutingModule } from './student-routing.module';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StudentRoutingModule,
        Ng2SearchPipeModule,
        FormsModule,
        NgxPaginationModule,
        ToastrModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ]
})
export class StudentModule { }