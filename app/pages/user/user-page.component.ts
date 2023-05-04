import {Component, Input, OnInit} from '@angular/core';

import {User} from "./user";


@Component({
  selector: 'app-user',
  templateUrl: './user-page.component.html',
  styleUrls:['./user-page.component.scss']
})
export class UserPageComponent {
  @Input() title: string = "Insert user"
  @Input()user: User = new User(0,"last name","first name","email","password","profile picture");









}

// @ts-ignore



