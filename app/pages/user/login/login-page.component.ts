import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user";




@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls:['./login-page.component.scss']
})
export class LoginPageComponent {
  @Input() title: string = ""
  @Input()user: User = new User(0,"last name","first name","email","password","profile picture");









}

// @ts-ignore



