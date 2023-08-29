import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// layout or Component
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { MaterialModule } from './material-module';

const widget = [

]
const classesToInclude = [
  DefaultLayoutComponent,
  HeaderComponent,
  FooterComponent,
  ModalConfirmComponent,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MaterialModule,
  ],
  // entryComponents: widget,
  declarations: [...classesToInclude],
  exports: [...classesToInclude,MaterialModule]
})
export class SharedModule { }
