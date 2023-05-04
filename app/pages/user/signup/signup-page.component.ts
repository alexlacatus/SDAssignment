import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user";




@Component({
  selector: 'app-signup',
  templateUrl: './signup-page.component.html',
  styleUrls:['./signup-page.component.scss']
})
export class SignupPageComponent {
  @Input() title: string = ""
  @Input()user: User = new User(0,"last name","first name","email","password","profile picture");









}

// @ts-ignore



