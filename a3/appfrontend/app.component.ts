import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./pages/user/user";
import {Answer} from "./pages/answer/answer";
import {Question} from "./pages/question/question";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-example';
  user: any = {
    name:"Pop Ion",
    username: "poppyion@gmail.com",
    password: "testpwd",
    address: "dummy  Address"
  };

  question: any = {
    name:"Pop Ion",
    username: "poppyion@gmail.com",
    password: "testpwd",
    address: "dummy  Address"
  };

  answer: any = {
    name:"Pop Ion",
    username: "poppyion@gmail.com",
    password: "testpwd",
    address: "dummy  Address"
  };


  users:User[]=[];
  questions:Question[]=[];
  answers:Answer[]=[];

  constructor(private http : HttpClient){
  }
  ngOnInit(){
    // this.getUsers().subscribe((data:any)=>{
    //   console.log(data);
    //   this.users=data;
    // })

    // this.getAnswers().subscribe((data:any)=>{
    //   console.log(data);
    //   this.answers=data;
    // })

  }

  getUser(id:number){
    return this.http.get<any>('http://localhost:8080/users/getById/'+id);
  }
  deleteUser(id:number){
    return this.http.delete<any>('http://localhost:8080/users/deleteById/'+id);
  }

  getUsers(){
    return this.http.get<any>('http://localhost:8080/users/getAll');
  }
  insertUser(user:User){
    return this.http.post<any>('http://localhost:8080/users/insertUser',user);
  }
  updateUser(user:User){
    return this.http.put<any>('http://localhost:8080/users/updateUser',user);
  }



  getAnswer(id:number){
    return this.http.get<any>('http://localhost:8080/answer/getById/'+id);
  }

  deleteAnswer(id:number){
    return this.http.delete<any>('http://localhost:8080/answers/deleteById/'+id);
  }

  getAnswers(){
    return this.http.get<any>('http://localhost:8080/questions/getById/1/answers/getAll');
  }
  insertAnswer(answer:Answer){
    return this.http.post<any>('http://localhost:8080/questions/getById/1/answers/insertAnswer',answer);
  }
  updateAnswer(answer:Answer){
    return this.http.post<any>('http://localhost:8080/questions/getById/1/answers/updateAnswer',answer);
  }







}




