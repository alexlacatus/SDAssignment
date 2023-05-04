import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input()title: string = 'angular-example';
  title1 :any =[];

  ngOnInit(){
    this.title1 = [
      {name:'test1', age:15},
      {name:'test2', age:12},
      {name:'test3', age:13},
      {name:'test4', age:14},
    ]
  }
}
