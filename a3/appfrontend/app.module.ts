import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {UserPageComponent} from "./pages/user/user-page.component";
import {HttpClientModule} from "@angular/common/http";
import {AnswerPageComponent} from "./pages/answer/answer-page.component";
import {Question} from "./pages/question/question";
import {QuestionPageComponent} from "./pages/question/question-page.component";
import {LoginPageComponent} from "./pages/user/login/login-page.component";
import {SignupPageComponent} from "./pages/user/signup/signup-page.component";
import {QuestionsPageComponent} from "./pages/question/quetions/questions-page.component";
import {AnswersPageComponent} from "./pages/answer/answers/answers-page.component";
import {UserService} from "./user.service";
import {QuestionuPageComponent} from "./pages/question/update/questionu-page.component";
import {AnsweruPageComponent} from "./pages/answer/update/answeru-page.component";
import {UsersPageComponent} from "./pages/user/admin/users-page.component";
import {BanPageComponent} from "./pages/user/ban/ban-page.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserPageComponent,
    UsersPageComponent,
    AnswerPageComponent,
    AnsweruPageComponent,
    QuestionPageComponent,
    QuestionuPageComponent,
    LoginPageComponent,
    SignupPageComponent,
    QuestionsPageComponent,
    AnswersPageComponent,
    BanPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
