import {Component, Input, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { Answer } from '../answer';
import {Question} from "../../question/question";
import {Content} from "../../content";
import {User} from "../../user/user";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../../../user.service";

@Component({
  selector: 'app-answers',
  templateUrl: './answers-page.component.html',
  styleUrls:['./answers-page.component.scss']
})
export class AnswersPageComponent implements AfterViewInit {
  @Input() title: string = "Answers";
  // @Input()answer: Answer = new Answer(0,  new Question(0,"last name",new Content(0,new User(1,"UserLastName","UserFirstName","email@com","pass","picture1"),"text","currentTime","picture1")),new Content(1,new User(2,"UserLastName","UserFirstName","email@com","pass","picture2"),"textanswer","currentTime","picture3"));


  user: UserE|null;
  constructor(private router: Router,private http : HttpClient,private route: ActivatedRoute,private userService: UserService) {

    this.user = this.userService.getUser();
  }







   questionId:number=0;

  ngOnInit() {
    if(this.user!=null) {
      this.route.queryParams.subscribe(params => {
        this.questionId = +params['questionId'];
        this.getQuestion(this.questionId).subscribe((data) => {


          let currentQuestion: QuestionE = data;
          console.log(data);

          this.getUserScore(currentQuestion.questionContent.contentUser.userId).subscribe((data) => {
            const questionEl: HTMLElement | null = <HTMLElement>document.querySelector('#question-div');
            //const div: HTMLDivElement = document.createElement("div");
            const user: HTMLSpanElement = document.createElement("span");
            user.innerText = `${currentQuestion.questionContent.contentUser.firstName} ${currentQuestion.questionContent.contentUser.lastName}(${data})`;
            user.classList.add("user");
            const date: HTMLSpanElement = document.createElement("span");
            date.innerText = `${currentQuestion.questionContent.contentDateTime}`;
            date.classList.add("date");
            const upvotes: HTMLSpanElement = document.createElement("span");
            this.getUpvotes(currentQuestion.questionContent.contentId).subscribe((data: any) => {
              let upvoteCount = data;
              upvotes.innerText = `${upvoteCount} upvotes`;
              upvotes.classList.add("upvotes");
              const upvote: HTMLButtonElement = document.createElement("button");
              upvote.innerText = 'upvote';
              upvote.addEventListener('click', () => {
                // Your event handler code goes here
                if (this.user != null) {
                  let vote = {
                    voteUser: new User(this.user.lastName, this.user.firstName, this.user.email, this.user.password, this.user.profilePicture)
                    ,
                    voteVote: true,
                    voteContent: new Content(new User(currentQuestion.questionContent.contentUser.lastName, currentQuestion.questionContent.contentUser.firstName, currentQuestion.questionContent.contentUser.email,
                        currentQuestion.questionContent.contentUser.password, currentQuestion.questionContent.contentUser.profilePicture)
                      , currentQuestion.questionContent.contentText, currentQuestion.questionContent.contentDateTime, currentQuestion.questionContent.contentPicture)
                  }
                  console.log(vote);
                  this.upVote(vote).subscribe((data) => {
                    console.log(data);
                    this.getUpvotes(currentQuestion.questionContent.contentId).subscribe((data: any) => {
                      let upvoteCount = data;
                      upvotes.innerText = `${upvoteCount} upvotes`;
                    });
                  });
                }


              });

              const downvote: HTMLButtonElement = document.createElement("button");
              downvote.innerText = 'downvote';
              downvote.addEventListener('click', () => {
                // Your event handler code goes here
                if (this.user != null)
                  this.upVote({
                    voteUser: new User(this.user.lastName, this.user.firstName, this.user.email, this.user.password, this.user.profilePicture)
                    ,
                    voteVote: false,
                    voteContent: new Content(new User(currentQuestion.questionContent.contentUser.lastName, currentQuestion.questionContent.contentUser.firstName, currentQuestion.questionContent.contentUser.email,
                        currentQuestion.questionContent.contentUser.password, currentQuestion.questionContent.contentUser.profilePicture)
                      , currentQuestion.questionContent.contentText, currentQuestion.questionContent.contentDateTime, currentQuestion.questionContent.contentPicture)
                  }).subscribe((data) => {
                    console.log(data);
                    this.getUpvotes(currentQuestion.questionContent.contentId).subscribe((data: any) => {
                      let upvoteCount = data;
                      upvotes.innerText = `${upvoteCount} upvotes`;
                    });
                  });

              });


              const update: HTMLButtonElement = document.createElement("button");
              update.innerText = 'update';
              update.addEventListener('click', () => {

                this.router.navigate(['/questionu-component'], {queryParams: {questionId: currentQuestion.questionId}});
              })
              const answer: HTMLParagraphElement = document.createElement("p");
              answer.innerText = currentQuestion.questionContent.contentText;
              const image: HTMLImageElement = document.createElement("img");
              image.setAttribute("src", currentQuestion.questionContent.contentPicture);
              image.setAttribute("alt", currentQuestion.questionContent.contentText);
              image.classList.add("answer-image");

              questionEl.appendChild(user);
              questionEl.appendChild(date);
              questionEl.appendChild(upvotes);

              questionEl.appendChild(answer);
              questionEl.appendChild(image);
              questionEl.appendChild(upvote);
              questionEl.appendChild(downvote);
              if (this.user?.userId == currentQuestion.questionContent.contentUser.userId||this.user?.userId==1)
                questionEl.appendChild(update);

              questionEl.classList.add("answer-item");
              //questionEl.appendChild(li);

            })


          });
        });
      });
    }
  }

  ngAfterViewInit() {
    const answerList: HTMLUListElement | null = <HTMLUListElement>document.querySelector('#answer-list');

    const answerButton: HTMLElement | null = <HTMLElement>document.querySelector('#answer-button');
    answerButton.addEventListener("click", () => {
      this.router.navigate(['/answer-component'],{ queryParams: { questionId: this.questionId } });
    });




    this.getAnswers(this.questionId).subscribe((data: any) => {
      let answers = data;

      if (answerList) {
        answers.forEach((a: AnswerE) => {
          this.getUserScore(a.answerContent.contentUser.userId).subscribe((data)=> {
          const li: HTMLLIElement = document.createElement("li");
          const user: HTMLSpanElement = document.createElement("span");
          user.innerText = `${a.answerContent.contentUser .firstName} ${a.answerContent.contentUser .lastName} (${data})`;
          user.classList.add("user");
          const date: HTMLSpanElement = document.createElement("span");
          date.innerText = `${a.answerContent.contentDateTime}`;
          date.classList.add("date");
          const upvotes: HTMLSpanElement = document.createElement("span");
          this.getUpvotes(a.answerContent.contentId).subscribe((data:any)=> {
            let upvoteCount = data;
            upvotes.innerText = `${upvoteCount} upvotes`;
            upvotes.classList.add("upvotes");
            const upvote: HTMLButtonElement = document.createElement("button");
            upvote.innerText = 'upvote';
            upvote.addEventListener('click', () => {
              // Your event handler code goes here
              if (this.user != null) {
                let vote = {
                  voteUser: new User(this.user.lastName, this.user.firstName, this.user.email, this.user.password, this.user.profilePicture)
                  ,
                  voteVote: true,
                  voteContent: new Content(new User(a.answerContent.contentUser.lastName, a.answerContent.contentUser.firstName, a.answerContent.contentUser.email,
                      a.answerContent.contentUser.password, a.answerContent.contentUser.profilePicture)
                    , a.answerContent.contentText, a.answerContent.contentDateTime, a.answerContent.contentPicture)
                }
                console.log(vote);
                this.upVote(vote).subscribe((data) => {
                  console.log(data);
                  this.getUpvotes(a.answerContent.contentId).subscribe((data: any) => {
                    let upvoteCount = data;
                    upvotes.innerText = `${upvoteCount} upvotes`;
                  });
                });
              }


            });

            const downvote: HTMLButtonElement = document.createElement("button");
            downvote.innerText = 'downvote';
            downvote.addEventListener('click', () => {
              // Your event handler code goes here
              if (this.user != null)
                this.upVote({
                  voteUser: new User(this.user.lastName, this.user.firstName, this.user.email, this.user.password, this.user.profilePicture)
                  ,
                  voteVote: false,
                  voteContent: new Content(new User(a.answerContent.contentUser.lastName, a.answerContent.contentUser.firstName, a.answerContent.contentUser.email,
                      a.answerContent.contentUser.password, a.answerContent.contentUser.profilePicture)
                    , a.answerContent.contentText, a.answerContent.contentDateTime, a.answerContent.contentPicture)
                }).subscribe((data) => {
                  console.log(data);
                  this.getUpvotes(a.answerContent.contentId).subscribe((data: any) => {
                    let upvoteCount = data;
                    console.log(upvoteCount);
                    upvotes.innerText = `${upvoteCount} upvotes`;
                  });
                });

            });


            const update: HTMLButtonElement = document.createElement("button");
            update.innerText = 'update';
            update.addEventListener('click', () => {

              this.router.navigate(['/answeru-component'], {
                queryParams: {
                  questionId: this.questionId,
                  answerId: a.answerId
                }
              });
            })
            const answer: HTMLParagraphElement = document.createElement("p");
            answer.innerText = a.answerContent.contentText;
            const image: HTMLImageElement = document.createElement("img");
            image.setAttribute("src", a.answerContent.contentPicture);
            image.setAttribute("alt", a.answerContent.contentText);
            image.classList.add("answer-image");

            li.appendChild(user);
            li.appendChild(date);
            li.appendChild(upvotes);

            li.appendChild(answer);
            li.appendChild(image);
            li.appendChild(upvote);
            li.appendChild(downvote);
            if (this.user?.userId == a.answerContent.contentUser.userId||this.user?.userId==1)
              li.appendChild(update);

            li.classList.add("answer-item");
            answerList.appendChild(li);
          });
          });
        });
      } else {
        console.error("Could not find the answer list element");
      }
    });
  }



  getAnswer(id:number,idQ:number){
    return this.http.get<any>('http://localhost:8080/questions/getById/'+ idQ+'/answers/getById/'+id);
  }

  deleteAnswer(id:number,idQ:number){
    return this.http.delete<any>('http://localhost:8080/questions/getById/'+ idQ+'/answers/deleteById'+id);
  }

  getAnswers(idQ:number){
    return this.http.get<any>('http://localhost:8080/questions/getById/'+ idQ+'/answers/getAll');
  }
  insertAnswer(answer:Answer,idQ:number){
    return this.http.post<any>('http://localhost:8080/questions/getById/'+ idQ+'/answers/insertAnswer',answer);
  }
  updateAnswer(answer:Answer,idQ:number){
    return this.http.post<any>('http://localhost:8080/questions/getById/'+ idQ+'/answers/updateAnswer',answer);
  }
  getUpvotes(c_id:number){
    return this.http.get<any>('http://localhost:8080/votes/getVotes/'+c_id);
  }

  upVote(vote:VoteE){

    return this.http.post<any>('http://localhost:8080/votes/upVote',vote);

  }

  getQuestion(id:number){
    return this.http.get<any>('http://localhost:8080/questions/getById/'+id);
  }

  getUserScore(u_id:number){
    return this.http.get<any>('http://localhost:8080/votes/getScore/'+u_id);
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




export interface AnswerE{

  answerId:number;
  answerQuestion:QuestionE;
  answerContent:ContentE;
}


interface QuestionE {
  questionId:number;
  title:string;
  questionContent:ContentE;



}

interface ContentE {
  contentId:number;

  contentUser:UserE;


  contentText:string;


  contentDateTime:Date;


  contentPicture:string;


}
interface UserE {
  userId:number;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  profilePicture: string;
}
interface Tag {
  tagId:number;
  tagName:string;
  tagQuestion: QuestionE;

}

interface QuestionW {
  question:QuestionE;
  tags:Tag[];

}


interface VoteE{
  //voteId:number;
  voteUser:User;
  voteVote: boolean;
  voteContent:Content


}

interface QuestionDTO{
  title:string;
  text:string;
  image:string;
  userName:string;
  time:Date;



}
