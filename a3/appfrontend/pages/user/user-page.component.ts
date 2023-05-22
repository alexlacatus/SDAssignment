import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import {User} from "./user";
import {UserE} from "../question/quetions/questions-page.component";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../user.service";
import {Content} from "../content";


@Component({
  selector: 'app-user',
  templateUrl: './user-page.component.html',
  styleUrls:['./user-page.component.scss']
})
export class UserPageComponent implements AfterViewInit{
  @Input() title: string = "Insert user"
  //@Input()user: User = new User("last name","first name","email","password","profile picture");
  user: UserE|null;
  constructor(private router: Router,private http : HttpClient,private route: ActivatedRoute,private userService: UserService) {

    this.user = this.userService.getUser();
  }

  ngAfterViewInit(): void {
    if(this.user!=null) {

      console.log(this.user);
      const usernameh: HTMLElement | null = <HTMLElement>document.querySelector('#lastname');
      usernameh.innerText = this.user.lastName;
      // const passwordh: HTMLElement | null = <HTMLElement>document.querySelector('#password');
      // passwordh.innerText = this.user.password;
      const emailh: HTMLElement | null = <HTMLElement>document.querySelector('#email');
      emailh.innerText = this.user.email
      const nameh: HTMLElement | null = <HTMLElement>document.querySelector('#firstname');
      nameh.innerText =  this.user.firstName

      const imageh: HTMLImageElement | null = <HTMLImageElement>document.querySelector('#ppicture');
      imageh.src=this.user.profilePicture;

      const scoreh: HTMLElement | null = <HTMLElement>document.querySelector('#score');
      this.getUserScore(this.user.userId).subscribe((data)=>{scoreh.innerText=data});

      const logout: HTMLButtonElement =<HTMLButtonElement> document.querySelector("#logout");

      logout.addEventListener('click', () => {
        // Your event handler code goes here
        this.userService.setUser(null);
        this.router.navigate(['/login-component']);

      });


    }
  }

  getUserScore(u_id:number){
    return this.http.get<any>('http://localhost:8080/votes/getScore/'+u_id);
  }

  isBanned(u_id:number){
    return this.http.get<any>('http://localhost:8080/bans/isBanned/'+u_id);
  }













}

// @ts-ignore



