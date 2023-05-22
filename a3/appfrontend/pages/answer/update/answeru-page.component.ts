import {AfterViewInit, Component, Input, OnInit} from '@angular/core';


import {HttpClient, HttpHeaders} from "@angular/common/http";


import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../user.service";

import {User} from "../../user/user";
import {Content} from "../../content";
import {Tag} from "../../tags";

import {Answer} from "../answer";

import {AnswerE} from "../answers/answers-page.component";
import {ContentE, UserE} from "../../question/quetions/questions-page.component";
import {Question} from "../../question/question";
import {QuestionE} from "../../question/update/questionu-page.component";




@Component({
  selector: 'app-question',
  templateUrl: './answeru-page.component.html',
  styleUrls:['./answeru-page.component.scss']
})
export class AnsweruPageComponent implements AfterViewInit {
  @Input() title: string = "Insert Question"
  //@Input()question: Question = new Question("last name",new Content(new User("UserLastName","UserFirstName","email@com","pass","picture1"),"text","currentTime","picture1"));
  user: UserE | null;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private userService: UserService) {

    this.user = this.userService.getUser();
  }

  selectedTags: string[] = [];


  questionId = 0;
  answerId =0;


  ngAfterViewInit() {

    this.route.queryParams.subscribe(params => {
      this.questionId = +params['questionId'];
      this.answerId = +params['answerId'];







      const submitButtonU = document.querySelector('#update');
      if (submitButtonU != null)
        submitButtonU.addEventListener('click', this.onSubmitU.bind(this));

      const submitButtonD = document.querySelector('#delete');
      if (submitButtonD != null)
        submitButtonD.addEventListener('click', this.onSubmitD.bind(this));
    });

  }

  getQuestion(id: number) {
    return this.http.get<any>('http://localhost:8080/questions/getById/' + id);
  }

  deleteQuestion(id: number) {
    return this.http.delete<any>('http://localhost:8080/questions/deleteById/' + id);
  }

  getQuestions() {
    return this.http.get<any>('http://localhost:8080/questions/getAllW');
  }

  insertQuestion(questionW: any) {
    return this.http.post<any>('http://localhost:8080/questions/insertQuestion', JSON.stringify(questionW));
  }

  updateQuestion(question: Question) {
    return this.http.post<any>('http://localhost:8080/questions/updateQuestion', question);
  }

  onSubmitU(event: Event) {

      event.preventDefault();

      const texth: HTMLInputElement | null = <HTMLInputElement>document.querySelector('#text');
      const text = texth.value;
      const imageh: HTMLInputElement | null = <HTMLInputElement>document.querySelector('#image');
      const image = imageh.value;

      //const tagsS = this.selectedTags;
      let user: User;
      if (this.user != null) {
        user = new User(this.user.lastName, this.user.firstName, this.user.email, this.user.password, this.user.profilePicture);
        //console.log(user._firstName+ "                       ss            ");
        const date = new Date();
        const content: Content = new Content(user, text, date, image);

        //this.selectedTags=['tag1', 'tag2', 'tag3'];

        //return;
        this.getQuestion(this.questionId).subscribe((data) => {

          let currentQuestionE: QuestionE = data;
          let currentQuestion = new Question(currentQuestionE.title, new Content(new User(currentQuestionE.questionContent.contentUser.lastName, currentQuestionE.questionContent.contentUser.firstName, currentQuestionE.questionContent.contentUser.email, currentQuestionE.questionContent.contentUser.password, currentQuestionE.questionContent.contentUser.profilePicture)
            , currentQuestionE.questionContent.contentText, currentQuestionE.questionContent.contentDateTime, currentQuestionE.questionContent.contentPicture));

          const answer1: Answer = new Answer(currentQuestion, content);

          const headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });
          let answerToUpdate: AnswerE;
          this.http.get<any>('http://localhost:8080/questions/getById/' + this.questionId + '/answers/getById/' + this.answerId).subscribe((data) => {
            console.log("new after get" + data);
            answerToUpdate = data;
            console.log(answerToUpdate);
            answerToUpdate.answerContent.contentDateTime = answer1._answerContent._contentDateTime;
            answerToUpdate.answerContent.contentPicture = answer1._answerContent._contentPicture;
            answerToUpdate.answerContent.contentText = answer1._answerContent._contentText;

            let answer = answerToUpdate;
            console.log(JSON.stringify(answer));
            this.http.put<any>('http://localhost:8080/questions/getById/' + this.questionId + '/answers/updateAnswer', answer, {headers})
              .subscribe((data) => {
                console.log(data)

                this.router.navigate(['/answers-component'],{ queryParams: { questionId: this.questionId } });


              });

          })


        });



      //this.insertQuestion({question,tags});

    }
  }

  onSubmitD(event: Event) {
    event.preventDefault();

      this.http.delete<any>('http://localhost:8080/questions/getById/' + this.questionId + '/answers/deleteById/' + this.answerId )
        .subscribe((data) => {
          console.log(data)

          this.router.navigate(['/answers-component'],{ queryParams: { questionId: this.questionId } });


        });
    }


  }




// @ts-ignore



