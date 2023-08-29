import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { of, Subscription } from "rxjs";

@Component(
  {
    selector: 'app-modal-confirm',
    templateUrl: './modal-confirm.component.html'
  }
)

export class ModalConfirmComponent implements OnInit {
  public data: any;
  public binary!: File;

  constructor(public modal: NgbActiveModal) { }

  async ngOnInit() {
  }

}