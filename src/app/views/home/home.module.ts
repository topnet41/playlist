import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeRoutes } from "./home.routing";

import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MemberFormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      NgxDatatableModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(HomeRoutes),
    ],
    declarations: [HomeComponent,MemberFormComponent],
    providers:[]
  })
  export class HomeModule { }