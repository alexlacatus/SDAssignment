import {AfterViewInit, Component, Input, OnInit} from '@angular/core';


import {HttpClient, HttpHeaders} from "@angular/common/http";


import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../user.service";
import {Question} from "../question";
import {User} from "../../user/user";
import {Content} from "../../content";
import {Tag} from "../../tags";
import {ContentE, UserE} from "../quetions/questions-page.component";




@Component({
  selector: 'app-question',
  templateUrl: './questionu-page.component.html',
  styleUrls:['./questionu-page.component.scss']
})
export class QuestionuPageComponent implements AfterViewInit {
  @Input() title: string = "Insert Question"
  //@Input()question: Question = new Question("last name",new Content(new User("UserLastName","UserFirstName","email@com","pass","picture1"),"text","currentTime","picture1"));
  user: UserE | null;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private userService: UserService) {

    this.user = this.userService.getUser();
  }

  selectedTags: string[] = [];


  questionId = 0;

  ngAfterViewInit() {

    this.route.queryParams.subscribe(params => {
      this.questionId = +params['questionId'];


      const tagsList: string[] = ['sport', 'personal', 'coding'];

      const selectTag: HTMLSelectElement = document.createElement("select");
      selectTag.multiple = true;

      tagsList.forEach((tag) => {
        const option: HTMLOptionElement = document.createElement("option");
        option.value = tag;
        option.text = tag;
        selectTag.appendChild(option);
      });

      selectTag.addEventListener("change", () => {
        if (Array.from(selectTag.selectedOptions, (option) => option.value))
          if (Array.from(selectTag.selectedOptions, (option) => option.value) != undefined)
            this.selectedTags = Array.from(selectTag.selectedOptions, (option) => option.value);
        console.log(this.selectedTags);
      });

// Add the select tag element to the DOM
      const tagList: HTMLElement | null = <HTMLElement>document.querySelector('#tag-list');
      tagList.appendChild(selectTag);

      const submitButtonU = document.querySelector('#update');
      if (submitButtonU != null)
        submitButtonU.addEventListener('click', this.onSubmitU.bind(this));

      const submitButtonD = document.querySelector('#delete');
      if (submitButtonD != null)
        submitButtonD.addEventListener('click', this.onSubmitD.bind(this));
    });

  }

  getQuestion(id: number) {
    return this.http.get<any>('http://localhost:8080/question/getById/' + id);
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
    return this.http.post<any>('http://localhost:8080/question/updateQuestion', question);
  }

  onSubmitU(event: Event) {
    event.preventDefault();
    const titleh: HTMLInputElement | null = <HTMLInputElement>document.querySelector('#title');
    const title = titleh.value;
    const texth: HTMLInputElement | null = <HTMLInputElement>document.querySelector('#text');
    const text = texth.value;
    const imageh: HTMLInputElement | null = <HTMLInputElement>document.querySelector('#image');
    const image = imageh.value;
    const newTagh: HTMLInputElement | null = <HTMLInputElement>document.querySelector('#new_tag');
    const newTags = newTagh.value.split(' ');
    //const tagsS = this.selectedTags;
    let user: User;
    if (this.user != null) {
      user = new User(this.user.lastName, this.user.firstName, this.user.email, this.user.password, this.user.profilePicture);
      //console.log(user._firstName+ "                       ss            ");
      const date = new Date();
      const content: Content = new Content(user, text, date, image);

      //this.selectedTags=['tag1', 'tag2', 'tag3'];
      console.log(this.selectedTags);
      //return;

      const question1: Question = new Question(title, content);
      let tags: Tag[] = [];

      //console.log(this.selectedTags);
      this.selectedTags.forEach((tag) => {
        tags.push(new Tag(tag, question1))
      });
      newTags.forEach((tag) => {
        tags.push(new Tag(tag, question1))
      });
      console.log({question1, tags} + "       ");
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let questionToUpdate :QuestionE;
      this.http.get<any>('http://localhost:8080/questions/getById/'+this.questionId).subscribe((data)=>{
        console.log("new after get"+data);
          questionToUpdate=data;
          console.log(questionToUpdate);
        questionToUpdate.questionContent.contentDateTime=question1._questionContent._contentDateTime;
        questionToUpdate.questionContent.contentPicture=question1._questionContent._contentPicture;
        questionToUpdate.questionContent.contentText=question1._questionContent._contentText;
        questionToUpdate.title=question1._title;
        let question=questionToUpdate;
        console.log(JSON.stringify({question, tags}));
        this.http.put<any>('http://localhost:8080/questions/updateQuestion', {question, tags}, {headers})
          .subscribe((data) => {
            console.log(data)

            this.router.navigate(['/questions-component']);


          });

      })



    }


    //this.insertQuestion({question,tags});

  }

  onSubmitD(event: Event) {
    event.preventDefault();

      this.http.delete<any>('http://localhost:8080/questions/deleteById/'+this.questionId )
        .subscribe((data) => {
          console.log(data)

          this.router.navigate(['/questions-component']);


        });
    }


  }



export interface QuestionE {
  questionId:number;
  title:string;
  questionContent:ContentE;



}
// @ts-ignore



