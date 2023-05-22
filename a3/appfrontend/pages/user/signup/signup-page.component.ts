import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {User} from "../user";
import {UserE} from "../../question/quetions/questions-page.component";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../user.service";





@Component({
  selector: 'app-signup',
  templateUrl: './signup-page.component.html',
  styleUrls:['./signup-page.component.scss']
})
export class SignupPageComponent implements AfterViewInit{
  //@Input() title: string = ""
  //@Input()user: User = new User("last name","first name","email","password","profile picture");

  user: UserE|null;
  constructor(private router: Router,private http : HttpClient,private route: ActivatedRoute,private userService: UserService) {

    this.user = this.userService.getUser();
  }

  ngAfterViewInit(): void {
    const signup = document.querySelector('#signup-button');
    if (signup != null)
      signup.addEventListener('click', this.onSubmit.bind(this));


  }

  onSubmit(event:Event){
    event.preventDefault();
    const lastNameh:HTMLInputElement=<HTMLInputElement>document.querySelector("#lastName");
    const lastName:string = lastNameh.value;
    const firstNameh:HTMLInputElement=<HTMLInputElement>document.querySelector("#firstName");
    const firstName:string = firstNameh.value;
    const emailh:HTMLInputElement=<HTMLInputElement>document.querySelector("#email");
    const email:string = emailh.value;
    const passwordh:HTMLInputElement=<HTMLInputElement>document.querySelector("#password");
    const password:string = passwordh.value;
    const confirmPasswordh:HTMLInputElement=<HTMLInputElement>document.querySelector("#confirmpassword");
    const confirmPassword:string = confirmPasswordh.value;
    const imageh:HTMLInputElement=<HTMLInputElement>document.querySelector("#image");
    // @ts-ignore
    const selectedFile: File = imageh.files[0];
    let fileName:string;
    if (selectedFile) {
      fileName = selectedFile.name;
      console.log(fileName);
    }
    // @ts-ignore
    const image = "assets\\\\"+fileName;

    if (password !== confirmPassword) {
      console.log("wrong password")
      return;
    }

    const newUser:User= new User(lastName, firstName, email, password, image);
    console.log(newUser);
    this.insertUser(newUser).subscribe(
      (data) => {


        // Handle successful user creation
        this.userService.setUser(data);
        this.router.navigate(['/questions-component']);
      }

    );

  }

  // sendEmail() {
  //   Email.send({
  //     SecureToken: 'YOUR_SECURE_TOKEN',
  //     To: 'recipient@example.com',
  //     From: 'sender@example.com',
  //     Subject: 'Test Email',
  //     Body: 'This is a test email sent from my Angular application using SMTPJS.',
  //   }).then((message: string) => {
  //     console.log('Email sent:', message);
  //   });
  // }






  insertUser(user:User){
    return this.http.post<any>('http://localhost:8080/users/insertUser',user);
  }









}

// @ts-ignore



