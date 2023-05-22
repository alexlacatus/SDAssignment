import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Event, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../user.service";
import {UserE} from "../question/quetions/questions-page.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit{
  @Input()title: string = 'angular-example';

  user: UserE|null;
  userId:number | undefined;
  isLogged:boolean;

  constructor(private router: Router,private http : HttpClient,private route: ActivatedRoute,private userService: UserService) {

    this.user = this.userService.getUser();
    this.userId=this.user?.userId;
    this.isLogged=this.userService.isLogged();
  }




  handleKeyPress(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      const searchQuery = (event.target as HTMLInputElement).value;
      console.log('Search query:', searchQuery);
      (event.target as HTMLInputElement).value = '';
      this.userService.setSearch(searchQuery);
    }


  }






  ngAfterViewInit(): void {

    const form:HTMLElement|null=<HTMLElement>document.querySelector('#form');
    form.addEventListener(('submit'),()=>{


    })
    const homepage:HTMLElement|null=<HTMLElement>document.querySelector('#homepage');
    console.log(this.user);



      homepage.addEventListener("click", () => {
        console.log(this.userService.getUser());
        if(this.userService.getUser()!=null)
          this.router.navigate(['/questions-component']);
        else
          this.router.navigate(['/login-component']);
      });

    const manageusers:HTMLElement|null=<HTMLElement>document.querySelector("#manageusers");


  }






}


