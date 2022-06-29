import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { registerUserInterface } from 'src/app/components/models/userRegister';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';




@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.scss']
})
export class RegisterUsersComponent implements OnInit {
  usersForm: FormGroup;

  datos2: registerUserInterface={
    id: Math.random().toString(36).substr(2,18),
    name: null,
    email: null,
    password: null,
    roles: {
      rol:null
    },
  }
  
  public email: string = '' ;
  public password: string = '';

  constructor(public anguAuth: AngularFireAuth ,private FirebaseServiceService: FirebaseServiceService,  public fb:FormBuilder, private toast: NgToastService ) { }


  ngOnInit(): void {
   }

  /*
  async onAddUser2(){
    const res= await this.auth2Service.registerUser2(this.datos2).catch((err) => {
        console.log('error', this.alertMsg ='La dirección de correo electrónico ya está en uso por otra cuenta.', this.isAlert=true);
      })
    if(res){ 
      console.log('Usuario creado con éxito');   
      const path= 'users';

 
   } 
  }


  onLoginRedirect2(): void {
    this.router.navigate(['register']);
  }
*/

guardarUsuario():void{
  this.FirebaseServiceService
  .createUsers(this.datos2).catch(error => {
    console.log(error);
  });

  this.FirebaseServiceService.registerUserDatos(this.datos2);

  this.toast.success({detail:'Registro exitoso', position:'tr', duration:5000});
}
  

}
