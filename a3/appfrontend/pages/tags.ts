import {Question} from "./question/question";

export class Tag{

  private tagName:string;
  private tagQuestion:Question;


  constructor(tagName: string, tagQuestion: Question) {
    this.tagName = tagName;
    this.tagQuestion = tagQuestion;
  }


  get _tagName(): string {
    return this.tagName;
  }

  set _tagName(value: string) {
    this.tagName = value;
  }

  get _tagQuestion(): Question {
    return this.tagQuestion;
  }

  set _tagQuestion(value: Question) {
    this.tagQuestion = value;
  }
}
