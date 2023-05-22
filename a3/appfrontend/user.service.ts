import {EventEmitter, Injectable} from '@angular/core';

import { UserE } from './pages/question/quetions/questions-page.component';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userKey = 'user';
  user: UserE | null;
  logged: boolean;
  search:string;
  stringValueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router,private http : HttpClient) {
    this.user = this.getUserFromLocalStorage();
    this.logged = !!this.user;
    this.search="";
  }

  private getUserFromLocalStorage(): UserE | null {
    const userJson = localStorage.getItem(this.userKey);
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }

  private setUserInLocalStorage(user: UserE | null) {
    if (user) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.userKey);
    }
  }

  setUser(user: UserE|null) {
    this.user = user;
    this.logged = true;
    this.setUserInLocalStorage(user);
  }

  getUser(): UserE | null {
    if(this.user!=null)
      this.isBanned(this.user?.userId).subscribe((data)=>{

        if(data==true)
          this.router.navigate(["ban-component"]);
      })
    return this.user;
  }

  isLogged(): boolean {
    return this.logged;
  }

  setSearch(search:string){
    this.search=search;
    this.stringValueChange.emit(search);
  }
  getSearch(search:string){
    this.search=search;
  }


  isBanned(u_id: number | undefined){
    return this.http.get<any>('http://localhost:8080/bans/isBanned/'+u_id);
  }
}







