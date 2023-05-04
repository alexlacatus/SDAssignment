import {Component, Input, OnInit,AfterViewInit} from '@angular/core';

import {Question} from "../question";
import {HttpClient} from "@angular/common/http";
import {Content} from "../../content";
import {User} from "../../user/user";
import {Router} from "@angular/router";



@Component({
  selector: 'app-questions',
  templateUrl: './questions-page.component.html',
  styleUrls:['./questions-page.component.scss']
})
export class QuestionsPageComponent implements  AfterViewInit{
  @Input() title: string = "Insert Question"
  @Input()question: Question = new Question(0,"last name",new Content(0,new User(1,"UserLastName","UserFirstName","email@com","pass","picture1"),"text","currentTime","picture1"));

  constructor(private router: Router) {}
  ngAfterViewInit(){

    const questionList: HTMLUListElement | null = <HTMLUListElement>document.querySelector('#question-list');

    if (questionList) {
      questions.forEach((q: QuestionDTO) => {
        const li: HTMLLIElement = document.createElement("li");

        const question: HTMLHeadingElement = document.createElement("h2");
        question.innerText = q.question;
        const image: HTMLImageElement = document.createElement("img");
        image.setAttribute("src", q.image);
        image.setAttribute("alt", q.question);
        image.classList.add("question-image");
        const tag: HTMLSpanElement = document.createElement("span");
        tag.innerText = q.tag;
        tag.classList.add("question-tag");

        li.appendChild(question);
        li.appendChild(image);
        li.appendChild(tag);
        li.addEventListener("click", () => {
          this.router.navigate(['/answers-component']);
        });

        li.classList.add("question-item");
        questionList.appendChild(li);
      });
    } else {
      console.error("Could not find the question list element");
    }




  }








}



interface QuestionDTO {
  question: string;

  image: string;
  tag: string;
}

const questions: QuestionDTO[] = [
  {
    question: "What is your name?",

    image: "https://picsum.photos/400/301",
    tag: "personal"
  },
  {
    question: "What is your favorite color?",

    image: "https://picsum.photos/400/302",
    tag: "fun"
  },
  {
    question: "What is your favorite food?",

    image: "https://picsum.photos/400/303",
    tag: "food"
  }
];







