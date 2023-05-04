import { Component, Input, AfterViewInit } from '@angular/core';
import { Answer } from '../answer';
import {Question} from "../../question/question";
import {Content} from "../../content";
import {User} from "../../user/user";

@Component({
  selector: 'app-answers',
  templateUrl: './answers-page.component.html',
  styleUrls:['./answers-page.component.scss']
})
export class AnswersPageComponent implements AfterViewInit {
  @Input() title: string = "Answers";
  @Input()answer: Answer = new Answer(0,  new Question(0,"last name",new Content(0,new User(1,"UserLastName","UserFirstName","email@com","pass","picture1"),"text","currentTime","picture1")),new Content(1,new User(2,"UserLastName","UserFirstName","email@com","pass","picture2"),"textanswer","currentTime","picture3"));

  ngAfterViewInit() {
    const answerList: HTMLUListElement | null = <HTMLUListElement>document.querySelector('#answer-list');

    if (answerList) {
      answers.forEach((a: AnswerDTO) => {
        const li: HTMLLIElement = document.createElement("li");
        const user: HTMLSpanElement = document.createElement("span");
        user.innerText = `${a.user.firstName} ${a.user.lastName}`;
        user.classList.add("user");
        const upvotes: HTMLSpanElement = document.createElement("span");
        upvotes.innerText = `${a.upvotes} upvotes`;
        upvotes.classList.add("upvotes");
        const upvote: HTMLButtonElement = document.createElement("button");
        upvote.innerText = 'upvote';
        const downvote: HTMLButtonElement = document.createElement("button");
        downvote.innerText = 'downvote';
        const answer: HTMLParagraphElement = document.createElement("p");
        answer.innerText = a.content.text;
        const image: HTMLImageElement = document.createElement("img");
        image.setAttribute("src", a.content.image);
        image.setAttribute("alt", a.content.text);
        image.classList.add("answer-image");

        li.appendChild(user);
        li.appendChild(upvotes);

        li.appendChild(answer);
        li.appendChild(image);
        li.appendChild(upvote);
        li.appendChild(downvote);

        li.classList.add("answer-item");
        answerList.appendChild(li);
      });
    } else {
      console.error("Could not find the answer list element");
    }
  }
}

interface UserDTO{

  firstName:string;
  lastName:string
}

interface ContentDTO{
  text:string;
  image:string;

}



interface AnswerDTO {
  user:UserDTO;

  upvotes:number;
  content: ContentDTO
}

const answers:AnswerDTO[] = [
  {
    user: {firstName:"GG", lastName:"Florin"},
    upvotes:10,
    content: {image: "https://picsum.photos/400/301",text:"Here is a solution"}

  },
  {
    user: {firstName:"BB", lastName:"Ionel"},
    upvotes:100,
    content: {image: "https://picsum.photos/400/302",text:"I solved it"}

  },
  {
    user: {firstName:"YY", lastName:"Mircea"},
    upvotes:3,
    content: {image: "https://picsum.photos/400/303",text:"This could work"}

  }
];
