import {Component, Input, OnInit,AfterViewInit} from '@angular/core';


import {HttpClient} from "@angular/common/http";
import {Content} from "../../content";
import {User} from "../../user/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../user.service";
import {Subject} from "rxjs";
import {AnswerE} from "../../answer/answers/answers-page.component";



@Component({
  selector: 'app-questions',
  templateUrl: './ban-page.component.html',
  styleUrls:['./ban-page.component.scss']
})
export class BanPageComponent implements AfterViewInit{



  constructor(private router: Router,private http : HttpClient,private route: ActivatedRoute,private userService: UserService) {


  }
  ngAfterViewInit(): void {

    const logout: HTMLButtonElement =<HTMLButtonElement> document.querySelector("#logout");

    logout.addEventListener('click', () => {
      // Your event handler code goes here
      this.userService.setUser(null);
      this.router.navigate(['/login-component']);

    });
  }
  //@Input() title: string = "Insert Question"
  //@Input()question: Question = new Question(0,"last name",new Content(0,new User(1,"UserLastName","UserFirstName","email@com","pass","picture1"),"text","currentTime","picture1"));



















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







