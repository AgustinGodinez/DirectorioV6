import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserInterface } from "src/app/components/models/user";
import { UserdbService } from "src/app/services/userdb.service";
import * as Notiflix from 'notiflix';
import { Router } from '@angular/router';



@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.scss"],
})
export class ListUsersComponent implements OnInit {
  users: UserInterface[];

  constructor(
    private authService: AuthService,
    private userdb: UserdbService,
    private router:Router
  ) {}
  
  public userRol: any = null;
  public userUid: any = null;

  ngOnInit(): void {
    this.getCurrentUser();
    this.userdb.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe((auth) => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe((userRole) => {
          this.userRol = Object.assign({}, userRole?.roles).rol;
        });
      }
    });
  }

  onPreUpdateUser(user:UserInterface): void{
    if(user.id){
      this.userdb.updateuser(user)
      
      Notiflix.Loading.standard('Cargando...')
    }
    this.router.navigate(['users']);
    Notiflix.Loading.remove(2000);
   }

   resetPass(user:UserInterface):void{
    if(user.id){
      this.authService.onReset(user);
      window.alert('checar email')
    }
    this.router.navigate(['users']);
   }
}
