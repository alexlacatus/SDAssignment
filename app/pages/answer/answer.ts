import {Content} from "../content";
import {Question} from "../question/question";

export class Answer {

  private _answerId:number;
  private _answerQuestion:Question;
  private _answerContent:Content;


  constructor(answerId: number, answerQuestion: Question, answerContent: Content) {
    this._answerId = answerId;
    this._answerQuestion = answerQuestion;
    this._answerContent = answerContent;
  }


  get answerId(): number {
    return this._answerId;
  }

  set answerId(value: number) {
    this._answerId = value;
  }

  get answerQuestion(): Question {
    return this._answerQuestion;
  }

  set answerQuestion(value: Question) {
    this._answerQuestion = value;
  }

  get answerContent(): Content {
    return this._answerContent;
  }

  set answerContent(value: Content) {
    this._answerContent = value;
  }
}
