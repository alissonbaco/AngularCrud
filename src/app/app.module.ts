import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component'


//Services
import { UserService } from './services/user.service';
import { OrderByPipe } from './pipes/order-by.pipe';
//import { SearchPipe } from './pipes/search.pipe';
import { FilterPipe} from './pipes/filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    NavComponent,
    FilterPipe,
    OrderByPipe,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: UserListComponent },
      { path: "users", component: UserListComponent },
      { path: "users/add", component: UserComponent },
      { path: "users/edit/:id", component: UserComponent },
      { path: '**', component: UserListComponent }
    ])
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
