import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'

})
export class UserListComponent implements OnInit {
  users: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;

  serarchText: string ='';
  
  constructor( private _userService : UserService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this._activatedRoute.snapshot.params["id"])
      this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
    this.getUsers();
  }

  //busca usuários
  getUsers(){
    this.users = this._userService.getUsersFromData();
  }

  //redireciona para adicionar
  add(){
    this._router.navigate(['users/add']);
  }

  //redireciona para editar
  edit(id){
    this._router.navigate(['users/edit/' + id])
  }

  //redirecionar para deletar
  delete(id,firstname,lastname){
    var ans = confirm("Do you want to delete user " + firstname + " " + lastname + "?");
    if(ans){
      this._userService.deleteUser(id);
    }
  }
}
