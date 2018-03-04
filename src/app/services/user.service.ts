import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { findIndex } from 'lodash';
import { User } from './user';
import { USER_LIST } from './user-data';


@Injectable()
export class UserService {
  private users = USER_LIST;

  //busca usuários
  getUsersFromData(): User[] {
    console.log(this.users);
    return this.users;
  }

  //busca último id criado
  getLastId():number{
    return Math.max.apply(Math,this.users.map(function(o){return o.id;}))
  }

  addUser(user: User) {

    //busca último id da lista e incrementa
    let number = this.getLastId();
    if (number == -Infinity) number = 0;
    user.id = number + 1;

    this.users.push(user);
    console.log(this.users);
  }

  //realiza update 
  updateUser(user: User) {
    let index = findIndex(this.users, (u: User) => {
      return u.id === user.id;
    });
    this.users[index] = user;
  }

  //busca usuário por id
  getUserById(id: number) {
    let index = findIndex(this.users, (u: User) => {
      return u.id === id;
    });
    return this.users[index];
   }

  //deleta usuário 
  deleteUser(id: number) {

    let index = findIndex(this.users, (u: User) => {
      return u.id === id;
    });

    this.users.splice(index,1);

    // this.users.splice(this.users.indexOf(user), 1);
    // console.log(this.users);
  }
   constructor(private _http: Http) { }
 }
