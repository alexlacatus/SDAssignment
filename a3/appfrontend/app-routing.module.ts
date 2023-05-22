import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserPageComponent} from "./pages/user/user-page.component";
import {QuestionPageComponent} from "./pages/question/question-page.component";
import {AnswerPageComponent} from "./pages/answer/answer-page.component";
import {LoginPageComponent} from "./pages/user/login/login-page.component";
import {SignupPageComponent} from "./pages/user/signup/signup-page.component";
import {QuestionsPageComponent} from "./pages/question/quetions/questions-page.component";
import {AnswersPageComponent} from "./pages/answer/answers/answers-page.component";
import {QuestionuPageComponent} from "./pages/question/update/questionu-page.component";
import {AnsweruPageComponent} from "./pages/answer/update/answeru-page.component";
import {UsersPageComponent} from "./pages/user/admin/users-page.component";
import {BanPageComponent} from "./pages/user/ban/ban-page.component";

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'login-component', component: LoginPageComponent },
  { path: 'signup-component', component: SignupPageComponent },
  { path: 'user-component', component: UserPageComponent },
  { path: 'users-component', component: UsersPageComponent },
  { path: 'question-component', component: QuestionPageComponent },
  { path: 'questionu-component', component: QuestionuPageComponent },
  { path: 'questions-component', component: QuestionsPageComponent },
  { path: 'answer-component', component: AnswerPageComponent },
  { path: 'answeru-component', component: AnsweruPageComponent },
  { path: 'answers-component', component: AnswersPageComponent },
  { path: 'ban-component', component: BanPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
