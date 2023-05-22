import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import {Question} from "./question";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Content} from "../content";
import {User} from "../user/user";

import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import { Tag } from '../tags';
import {UserService} from "../../user.service";
import {UserE} from "./quetions/questions-page.component";


@Component({
  selector: 'app-question',
  templateUrl: './question-page.component.html',
  styleUrls:['./question-page.component.scss']
})
export class QuestionPageComponent implements AfterViewInit{
  @Input() title: string = "Insert Question"
  //@Input()question: Question = new Question("last name",new Content(new User("UserLastName","UserFirstName","email@com","pass","picture1"),"text","currentTime","picture1"));
  user: UserE|null;
  constructor(private router: Router,private http : HttpClient,private route: ActivatedRoute,private userService: UserService) {

    this.user = this.userService.getUser();
  }
  selectedTags:string[]=[];






  ngAfterViewInit() {
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
      if(Array.from(selectTag.selectedOptions, (option) => option.value))
        if(Array.from(selectTag.selectedOptions, (option) => option.value)!=undefined)
          this.selectedTags = Array.from(selectTag.selectedOptions, (option) => option.value);
      console.log(this.selectedTags);
    });

// Add the select tag element to the DOM
    const tagList  :HTMLElement | null = <HTMLElement>document.querySelector('#tag-list');
    tagList.appendChild(selectTag);

    const submitButton = document.querySelector('input[type="submit"]');
    if(submitButton!=null)
      submitButton.addEventListener('click', this.onSubmit.bind(this));

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
  insertQuestion(questionW:any){
    return this.http.post<any>('http://localhost:8080/questions/insertQuestion',JSON.stringify( questionW));
  }
  updateQuestion(question:Question){
    return this.http.post<any>('http://localhost:8080/question/updateQuestion',question);
  }

  onSubmit(event:Event) {
    event.preventDefault();
    const titleh  :HTMLInputElement | null = <HTMLInputElement>document.querySelector('#title');
    const title = titleh.value;
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
    const newTagh  :HTMLInputElement | null = <HTMLInputElement>document.querySelector('#new_tag');
    const newTags = newTagh.value.split(' ');
    //const tagsS = this.selectedTags;
    let user:User ;
    if(this.user!=null) {
      user = new User(this.user.lastName, this.user.firstName, this.user.email, this.user.password, this.user.profilePicture);
      //console.log(user._firstName+ "                       ss            ");
      const date = new Date();









      const content: Content = new Content(user, text, date, image);

      //this.selectedTags=['tag1', 'tag2', 'tag3'];
      console.log(this.selectedTags);
      //return;

      const question: Question = new Question(title, content);
      let tags: Tag[] = [];

      //console.log(this.selectedTags);
      this.selectedTags.forEach((tag) => {
        tags.push(new Tag(tag, question))
      });
      if(newTagh.value!="") {
        newTags.forEach((tag) => {
          tags.push(new Tag(tag, question))
        });
      }
      console.log({question, tags} + "       ");
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      console.log(JSON.stringify({question, tags}));
      this.http.post<any>('http://localhost:8080/questions/insertQuestion', {question, tags}, {headers})
        .subscribe((data) => {
          console.log(data)

          this.router.navigate(['/questions-component']);


        });
    }
    //this.insertQuestion({question,tags});

  }













}



// @ts-ignore



