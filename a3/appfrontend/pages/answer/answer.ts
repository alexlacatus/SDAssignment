import {Content} from "../content";
import {Question} from "../question/question";

export class Answer {


  private answerQuestion:Question;
  private answerContent:Content;


  constructor( answerQuestion: Question, answerContent: Content) {

    this.answerQuestion = answerQuestion;
    this.answerContent = answerContent;
  }




  get _answerQuestion(): Question {
    return this.answerQuestion;
  }

  set _answerQuestion(value: Question) {
    this.answerQuestion = value;
  }

  get _answerContent(): Content {
    return this.answerContent;
  }

  set _answerContent(value: Content) {
    this.answerContent = value;
  }
}
