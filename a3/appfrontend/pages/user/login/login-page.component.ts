import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {User} from "../user";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../../../user.service";
import {UserE} from "../../question/quetions/questions-page.component";
import {Content} from "../../content";
import {Question} from "../../question/question";
import {Tag} from "../../tags";




@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls:['./login-page.component.scss']
})
export class LoginPageComponent implements AfterViewInit{
  @Input() title: string = ""
  //@Input()user: User = new User("last name","first name","email","password","profile picture");

  user: UserE|null;
  constructor(private router: Router,private http : HttpClient,private route: ActivatedRoute,private userService: UserService) {

    this.user = this.userService.getUser();
  }

  ngAfterViewInit(): void {
    const submitButton = document.querySelector('#login-button');
    if(submitButton!=null)
      submitButton.addEventListener('click', this.onSubmit.bind(this));
  }


  onSubmit(event:Event) {
    event.preventDefault();
    const usernameh  :HTMLInputElement | null = <HTMLInputElement>document.querySelector('#username');
    const username = usernameh.value;
    const passwordh :HTMLInputElement | null = <HTMLInputElement>document.querySelector('#password');
    const password = passwordh.value;
    if(username==''||password==''){
      console.log("couldnt login");
      return;
    }


    //const tagsS = this.selectedTags;

    let user:UserC={username:username,password:password} ;
    console.log(user);
    this.logUser(user).subscribe((data)=>{

      if(data==null)
        console.log("couldnt login");
      else{
        console.log(data);

        this.user=data;

        this.userService.setUser(data);
        this.router.navigate(['/questions-component']) ;

      }

    });
      //this.insertQuestion({question,tags});
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

  logUser(userC:UserC){
    return this.http.get<any>('http://localhost:8080/users/logUser/'+userC.username+'/'+userC.password);
  }











}

interface UserC{
  username:string;
  password:string
}



// @ts-ignore



