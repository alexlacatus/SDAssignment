import {Component, Input, OnInit} from '@angular/core';

import {Answer} from "./answer";
import {HttpClient} from "@angular/common/http";
import {Question} from "../question/question";
import {Content} from "../content";
import {User} from "../user/user";

@Component({
  selector: 'app-answer',
  templateUrl: './answer-page.component.html',
  styleUrls:['./answer-page.component.scss']
})
export class AnswerPageComponent {
  @Input() title: string = "Insert answer"
  @Input()answer: Answer = new Answer(0,  new Question(0,"last name",new Content(0,new User(1,"UserLastName","UserFirstName","email@com","pass","picture1"),"text","currentTime","picture1")),new Content(1,new User(2,"UserLastName","UserFirstName","email@com","pass","picture2"),"textanswer","currentTime","picture3"));







}

// @ts-ignore



