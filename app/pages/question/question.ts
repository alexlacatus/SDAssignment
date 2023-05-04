import {Content} from "../content";

export class Question {

  private _questionId:number;

  private _title:string;

  private _questionContent:Content;


  constructor(questionId: number, title: string, questionContent: Content) {
    this._questionId = questionId;
    this._title = title;
    this._questionContent = questionContent;
  }



  get questionId(): number {
    return this._questionId;
  }

  set questionId(value: number) {
    this._questionId = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get questionContent(): Content {
    return this._questionContent;
  }

  set questionContent(value: Content) {
    this._questionContent = value;
  }
}
