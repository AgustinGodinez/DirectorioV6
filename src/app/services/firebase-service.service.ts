import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { registerUserInterface } from 'src/app/components/models/userRegister';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private angFire:AngularFireAuth, private firestore: AngularFirestore) { }

  getEmployee(){

    return this.firestore.collection("employees",ref => ref.orderBy('nombre', 'asc')).snapshotChanges();
   }
   getUsers(){

    return this.firestore.collection("users").snapshotChanges();
   }

   registerUserDatos(datos2: registerUserInterface){
    return this.angFire.createUserWithEmailAndPassword(datos2.email, datos2.password);
  }

   getProyect(){
    return this.firestore.collection("proyectos").snapshotChanges();
  }

  getResponsable(){
    return this.firestore.collection("responsables").snapshotChanges();
  }
   
   getEmployeeId(id:number){
     
   }
   
   createEmployee(employee:any){
   return this.firestore.collection("employees").add(employee);
   }

   createUsers(user:any){
    return this.firestore.collection("users").add(user);
    }

  
   createResponsable(responsable_directo:any){
    return this.firestore.collection("responsables").add(responsable_directo);
   }

   createProyecto(proyect:any){
    return this.firestore.collection("proyectos").add(proyect);
   }
   updateEmployee(id:any, employee:any){
     return this.firestore.collection("employees").doc(id).update(employee)
   }
   
   deleteEmployee(id:any){
     return this.firestore.collection("employees").doc(id).delete();
   }
   
}
