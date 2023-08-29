import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { of, Subscription } from "rxjs";
import moment from 'moment';


@Component(
  {
    selector: 'app-member-form',
    templateUrl: './form.component.html'
  }
)

export class MemberFormComponent implements OnInit {
  public data: any;
  public item: any;
  public module: any = "";
  public app_id: number = 2;
  public app_name: string = "ร้านค้า";
  public loading: boolean = true;
  public limit: number = 10;
  public imageSrc!: any;
  public binary!: File;
  public provinces = ['กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'พะเยา', 'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยโสธร', 'ยะลา', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อุดรธานี', 'อุตรดิตถ์', 'อุทัยธานี', 'อุบลราชธานี', 'อำนาจเจริญ'];

  public subRoute!: Subscription;
  public form!: FormGroup;
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute, private toastr: ToastrService, private fb: FormBuilder) { }

  async ngOnInit() {
    moment.locale('th');
    if (this.data.id) {

    } else {
      this.buildForm();
    }
  }

  changeDate(event: any) {
    this.form.get('date_end')?.setValue(moment(event.target.value).add('y', 1).format('YYYY-MM-D'))
  }

  buildForm() {
    let itemForm = {};
    itemForm = {
      date_start: [this.item && this.item['date_start'] ? this.item['date_start'] : moment().format('YYYY-MM-D'), Validators.required],
      date_end: [this.item && this.item['date_end'] ? this.item['date_end'] : moment().add('y', 1).format('YYYY-MM-D'), Validators.required]
    }
    if (this.data.isNew) {
      var vehicle = undefined;
      var number , prefix;
      if(this.item['vehicle']){
        vehicle = this.item['vehicle'].split(' ');
        prefix = vehicle[0];
        number = vehicle[1];
      }
      this.form = this.fb.group({
        desc: [this.item['desc'], Validators.required],
        prefix:[prefix ? prefix : '', Validators.required],
        provinces:[vehicle ? vehicle[vehicle.length-1] : '', Validators.required],
        number:[number, Validators.required],
        ...itemForm
      });
    } else {
      this.form = this.fb.group({
        desc: ['', Validators.required],
        prefix:['', Validators.required],
        provinces:['', Validators.required],
        number:['', Validators.required],
        ...itemForm
      });
      this.loading = false;
    }
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.binary = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.binary);
    }
  }

  submit() {
    let item = this.form.value;
    let res: any = {}
    res['body'] = { ...item,vehicle:`${item.prefix} ${item.number} ${item.provinces}` }
    this.modal.close(res)
  }

}