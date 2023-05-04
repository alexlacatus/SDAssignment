import {Component, Input, OnInit} from '@angular/core';

import {Question} from "./question";
import {HttpClient} from "@angular/common/http";
import {Content} from "../content";
import {User} from "../user/user";


@Component({
  selector: 'app-question',
  templateUrl: './question-page.component.html',
  styleUrls:['./question-page.component.scss']
})
export class QuestionPageComponent {
  @Input() title: string = "Insert Question"
  @Input()question: Question = new Question(0,"last name",new Content(0,new User(1,"UserLastName","UserFirstName","email@com","pass","picture1"),"text","currentTime","picture1"));









}

// @ts-ignore



