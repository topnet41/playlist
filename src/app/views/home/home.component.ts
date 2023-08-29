import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { MemberFormComponent } from './form/form.component';
import {  setDoc, updateDoc , query , Firestore , collection, collectionData , orderBy , limit , docData , where ,startAt  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { takeWhile } from "rxjs/operators";
// import {  } from '@angular/fire/storage';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public items:any;
  public loading: boolean = true;
  public limit: number = 10;
  public name = '';
  public by = 'name';
  isAlive: boolean = true;

  public page = {
    pageNumber: 0,
    size: this.limit,
    totalElements: 0,
    orderBy: 'created',
    order: 'desc'
  };

  isLoading = true;
  @ViewChild('table', { static: true })
  table!: DatatableComponent;
  constructor(private modal: NgbModal, private toastr: ToastrService,  private firestore:Firestore ) { }

  ngOnInit() {
    this.getItems();

  };

  ngOnDestroy() {
    this.isAlive = false;
  }

  async test(){
    return new Promise<any>((resolve)=>{
      const collections = collection(this.firestore,'test');
      collectionData(collections).toPromise();
    })
  }

  async getItems({ offset = 0, loading = true, refresh = false } = {}) {
    this.loading = true;
    const collections = collection(this.firestore,'music');
    let _query = query(collections,orderBy('mes','desc'));
    collectionData(_query,{idField:'id'}).pipe(takeWhile(() => this.isAlive)).subscribe(data=>{
      this.items = data;
      this.loading = false;
    });

    query(collections,)
    
    if (refresh) {
      // this.items = [];
      this.page = {
        pageNumber: this.page.pageNumber,
        size: this.limit,
        totalElements: 0,
        orderBy: this.page.orderBy,
        order: this.page.order
      };
      this.table.offset = this.page.pageNumber;
    }

  }


  async delete(id:any,{refresh = true}={}){

      this.getItems({ refresh: true });
  }


  async modaldelete(item: any) {
    let res;
    let title = 'คุณต้องการลบ';
    let message = item.desc + '?'
    let modalRef: NgbModalRef = this.modal.open(ModalConfirmComponent, { size: "md" });
    modalRef.componentInstance.data = { title, message }
    modalRef.result.then(async () => {
      await this.delete(item.id);
    })

  }

  openModal() {
    this.modal.open("",)
  }

  openPopup(userId?:any,{ id = "", isNew = false } = {}) {
    let title = isNew ? "อัพเดทรถ" : "เพิ่มการตอบกลับ";
    let modalRef: NgbModalRef = this.modal.open(MemberFormComponent, { size: "md" });
    modalRef.componentInstance.data = { title, id: id, isNew }
    modalRef.result.then(async (res) => {
      this.loading = true;
      let url;
     

    }).catch(err => { });
  }

}