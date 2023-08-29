import { Component,OnInit,OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import liff from '@line/liff';
import { Auth , signOut } from '@angular/fire/auth'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  public open:boolean = false;

  constructor(private router: Router,private auth:Auth,private toast:ToastrService){}

  ngOnInit(){};

  ngOnDestroy(){
  }

  isActive(url:any): boolean {
  this.router.events.subscribe(() => {});
   return this.router.url == url;
  }

  async logout(){
    liff.logout();
    signOut(this.auth);
    this.toast.success("พบกันใหม่");
    this.router.navigateByUrl('/sessions/signin',{ replaceUrl:true });
  }

}