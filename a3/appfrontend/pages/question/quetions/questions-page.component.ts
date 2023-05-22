import {Component, Input, OnInit,AfterViewInit} from '@angular/core';

import {Question} from "../question";
import {HttpClient} from "@angular/common/http";
import {Content} from "../../content";
import {User} from "../../user/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../user.service";
import {Subject} from "rxjs";



@Component({
  selector: 'app-questions',
  templateUrl: './questions-page.component.html',
  styleUrls:['./questions-page.component.scss']
})
export class QuestionsPageComponent implements  AfterViewInit, OnInit{
  @Input() title: string = "Insert Question"
  //@Input()question: Question = new Question(0,"last name",new Content(0,new User(1,"UserLastName","UserFirstName","email@com","pass","picture1"),"text","currentTime","picture1"));



  user: UserE|null;
  constructor(private router: Router,private http : HttpClient,private route: ActivatedRoute,private userService: UserService) {

    this.user = this.userService.getUser();
    this.questions=[];



  }

  filterQuestions(search:string){

    this.questions = this.questions.filter(question =>
      question.question.title.includes(search) ||
      question.tags.some(tag => tag.tagName.includes(search)) ||
      question.question.questionContent.contentUser.firstName.includes(search) ||
      question.question.questionContent.contentUser.lastName.includes(search)
    );

  }
  questions:QuestionW[] = [];



  ngOnInit(): void {

    this.getQuestions().subscribe((data: any) => {
      console.log(data);
      this.questions = data;
      this.populateQuestions();


    });
  }

  ngAfterViewInit(){







    console.log(this.user);


    this.userService.stringValueChange.subscribe((value: string) => {
      this.getQuestions().subscribe((data: any) => {
        console.log(data);
        this.questions = data;

        this.filterQuestions(value);
        this.populateQuestions();

        console.log(this.questions.length);


      });
    });








  }

  populateQuestions(){
    const questionList: HTMLUListElement | null = <HTMLUListElement>document.querySelector('#question-list');
    if (questionList) {
      questionList.innerText="";

      this.questions.forEach((q) => {

        console.log('*');
        const li: HTMLLIElement = document.createElement("li");

        const question: HTMLHeadingElement = document.createElement("h2");
        question.innerText = q.question.title;
        this.getUserScore(q.question.questionContent.contentUser.userId).subscribe((data)=> {
          const user: HTMLSpanElement = document.createElement("span");
          user.innerText = q.question.questionContent.contentUser.lastName + " " + q.question.questionContent.contentUser.firstName + "(" +data+")";
          user.classList.add("question-user");

          const date: HTMLSpanElement = document.createElement("span");
          console.log(q.question.questionContent.contentDateTime);
          date.innerText = q.question.questionContent.contentDateTime.toString();
          date.classList.add("question-date");

          const image: HTMLImageElement = document.createElement("img");
          image.setAttribute("src", q.question.questionContent.contentPicture);
          image.setAttribute("alt", q.question.title);
          image.classList.add("question-image");


          li.appendChild(question);
          li.appendChild(user);
          li.appendChild(date);
          li.appendChild(image);
          q.tags.forEach((t) => {
            const tag: HTMLSpanElement = document.createElement("span");
            tag.innerText = t.tagName;
            tag.classList.add("question-tag");
            li.appendChild(tag);
          });

          li.addEventListener("click", () => {
            this.router.navigate(['/answers-component'], {queryParams: {questionId: q.question.questionId}});
          });

          li.classList.add("question-item");
          questionList.appendChild(li);
        });
      });
    } else {
      //console.error("Could not find the question list element");
    }

  }



  getQuestion(id:number){
    return this.http.get<any>('http://localhost:8080/question/getById/'+id);
  }
  deleteQuestion(id:number){
    return this.http.delete<any>('http://localhost:8080/questions/deleteById/'+id);
  }

  getQuestions(){
    return this.http.get<any>('http://localhost:8080/questions/getAllW');
  }
  insertQuestion(question:Question){
    return this.http.post<any>('http://localhost:8080/questions/insertQuestion',question);
  }
  updateQuestion(question:Question){
    return this.http.post<any>('http://localhost:8080/question/updateQuestion',question);
  }

  getUserScore(u_id:number){
    return this.http.get<any>('http://localhost:8080/votes/getScore/'+u_id);
  }










}



interface QuestionDTO {
  title: string;
  text:string;
  image:string;
  userName:string;
  time:string;
  tags: string[];

}

export interface QuestionE {
  questionId:number;
  title:string;
  questionContent:ContentE;



}

export interface ContentE {
  contentId:number;

  contentUser:UserE;


   contentText:string;


   contentDateTime:Date;


   contentPicture:string;


}
export interface Tag {
  tagId:number;
  tagName:string;
  tagQuestion: QuestionE;

}

export interface QuestionW {
  question:QuestionE;
  tags:Tag[];

}
export interface UserE {
  userId:number;
   lastName: string;
   firstName: string;
   email: string;
   password: string;
   profilePicture: string;
}








// const questions: QuestionDTO[] = [
//   {
//     question: "What is your name?",
//
//     image: "https://picsum.photos/400/301",
//     tag: "personal"
//   },
//   {
//     question: "What is your favorite color?",
//
//     image: "https://picsum.photos/400/302",
//     tag: "fun"
//   },
//   {
//     question: "What is your favorite food?",
//
//     image: "https://picsum.photos/400/303",
//     tag: "food"
//   }
// ];







