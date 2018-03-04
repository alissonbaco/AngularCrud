import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  title: string = "Add";
  id: number = 0;
  errorMessage: any;
  submitted: boolean = false;
  _ref: any;
  constructor(private _fb: FormBuilder,
    private _avRoute: ActivatedRoute,
    private _userService: UserService,
    private _router: Router) {

    //verifica se é um usuário novo  
    if (this._avRoute.snapshot.params["id"]) {
      this.id = parseInt(this._avRoute.snapshot.params["id"]);
      console.log(this.id);
      this.title = 'Edit';
      
    }

    this.userForm = this._fb.group({
      id: 0,
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.email]],
      field: '',
      role: ''
    })
  }

  ngOnInit() {
    if (this.id > 0) {
      //se for edit
      let User = this._userService.getUserById(this.id);
      this.userForm.setValue(User);
    }
  }

  //salva usuário
  save() {
    debugger;
    if (!this.userForm.valid) {
      this.submitted = true;
      return;
    }
    if (this.id > 0) {
      this.updateUser();
      this._router.navigate(["userlist"]);
    }
    else
    {
      this._userService.addUser(this.userForm.value);
      this._router.navigate(["userlist"]);
    }
  }

  //atualiza usuário
  updateUser() {
    this._userService.updateUser(this.userForm.value);
  }

  //cancela
  cancel() {
    this._router.navigate(["users", { id: this.id }]);
  }

  get firstname() { return this.userForm.get('firstname'); }
  get lastname() { return this.userForm.get('lastname'); }
  get email() { return this.userForm.get('email'); }

}
