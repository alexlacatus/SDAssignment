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
  templateUrl: './users-page.component.html',
  styleUrls:['./users-page.component.scss']
})
export class UsersPageComponent implements  AfterViewInit{
  @Input() title: string = "Insert Question"
  //@Input()question: Question = new Question(0,"last name",new Content(0,new User(1,"UserLastName","UserFirstName","email@com","pass","picture1"),"text","currentTime","picture1"));



  user: UserE|null;
  constructor(private router: Router,private http : HttpClient,private route: ActivatedRoute,private userService: UserService) {

    this.user = this.userService.getUser();



  }






  ngAfterViewInit() {
    if(this.user?.userId!=1)
      this.router.navigate(["questions-component"]);
    this.populate();
  }


  populate(){
    const userList: HTMLUListElement | null = <HTMLUListElement>document.querySelector('#user-list');
    userList.innerText="";

    this.getUsers().subscribe((data)=> {
      let users = data;
      if (userList) {
        users.forEach((u: UserE) => {
          if(u.userId!=1) {
            this.getUserScore(u.userId).subscribe((data) => {
              const li: HTMLLIElement = document.createElement("li");
              const user: HTMLSpanElement = document.createElement("span");
              user.innerText = `${u.firstName} ${u.lastName} (${data})`;
              user.classList.add("user");
              li.appendChild(user);
              this.isBanned(u.userId).subscribe((data) => {
                if (data == false) {

                  const ban: HTMLButtonElement = document.createElement("button");
                  li.appendChild(ban);
                  ban.innerText = 'ban';
                  ban.classList.add("ban-button");
                  ban.addEventListener('click', () => {
                    this.banUser(u.userId).subscribe(() => {

                      console.log(data);
                      this.populate();


                    });
                  });
                } else {

                  const unban: HTMLButtonElement = document.createElement("button");
                  li.appendChild(unban);
                  unban.innerText = 'unban';
                  unban.classList.add("unban-button");
                  unban.addEventListener('click', () => {
                    this.unbanUser(u.userId).subscribe(() => {

                      console.log(data);
                      this.populate();


                    });
                  });
                }


                li.classList.add("answer-item");
                userList.appendChild(li);
              });


            });

          }
        });
      }
    });
  }


  getUsers(){
    return this.http.get<any>('http://localhost:8080/users/getAll');
  }

  banUser(u_id:number){
    return this.http.post<any>('http://localhost:8080/bans/banUser',u_id);
  }
  unbanUser(u_id:number){
    return this.http.post<any>('http://localhost:8080/bans/unbanUser',u_id);
  }

  isBanned(u_id:number){
    return this.http.get<any>('http://localhost:8080/bans/isBanned/'+u_id);
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







