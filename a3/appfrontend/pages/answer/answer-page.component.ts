import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import {Answer} from "./answer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Question} from "../question/question";
import {Content} from "../content";
import {User} from "../user/user";
import {Tag} from "../tags";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-answer',
  templateUrl: './answer-page.component.html',
  styleUrls:['./answer-page.component.scss']
})
export class AnswerPageComponent implements AfterViewInit,OnInit{
  @Input() title: string = "Insert answer"
  //@Input()answer: Answer = new Answer(0,  new Question(0,"last name",new Content(0,new User(1,"UserLastName","UserFirstName","email@com","pass","picture1"),"text","currentTime","picture1")),new Content(1,new User(2,"UserLastName","UserFirstName","email@com","pass","picture2"),"textanswer","currentTime","picture3"));


  user: UserE|null;
  constructor(private router: Router,private http : HttpClient,private route: ActivatedRoute,private userService: UserService) {

    this.user = this.userService.getUser();
  }

  questionId:number=0;


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.questionId = +params['questionId'];

    });
  }




  ngAfterViewInit(): void {

    const submitButton = document.querySelector('input[type="submit"]');
    if(submitButton!=null)
      submitButton.addEventListener('click', this.onSubmit.bind(this));
  }

  onSubmit(event:Event) {
    event.preventDefault();

    const texth  :HTMLInputElement | null = <HTMLInputElement>document.querySelector('#text');
    const text = texth.value;
    const imageh  :HTMLInputElement | null = <HTMLInputElement>document.querySelector('#image');
    // @ts-ignore
    const selectedFile: File = imageh.files[0];
    let fileName:string;
    if (selectedFile) {
      fileName = selectedFile.name;
      console.log(fileName);
    }
    // @ts-ignore
    const image = "assets\\\\"+fileName;

    //const tagsS = this.selectedTags;
    let user:User ;
    if(this.user!=null) {
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

        const answer: Answer = new Answer(currentQuestion, content);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        console.log(JSON.stringify(answer));
        this.http.post<any>('http://localhost:8080/questions/getById/' + this.questionId + '/answers/insertAnswer', answer, {headers})
          .subscribe((data) => {
            console.log(data)

            this.router.navigate(['/answers-component'],{ queryParams: { questionId: this.questionId } });


          });
        //this.insertQuestion({question,tags});
      });
    }



  }

  getQuestion(id:number){
    return this.http.get<any>('http://localhost:8080/questions/getById/'+id);
  }






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

// @ts-ignore



