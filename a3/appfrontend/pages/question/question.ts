import {Content} from "../content";

export class Question {



  private title:string;

  private questionContent:Content;


  constructor( title: string, questionContent: Content) {

    this.title = title;
    this.questionContent = questionContent;
  }





  get _title(): string {
    return this.title;
  }

  set _title(value: string) {
    this.title = value;
  }

  get _questionContent(): Content {
    return this.questionContent;
  }

  set _questionContent(value: Content) {
    this.questionContent = value;
  }
}
