import { Component, OnInit } from '@angular/core';
import { Peticion } from '../peticion';
import { PeticionService } from '../peticion.service';
import { AuthStateService } from '../../shared//auth-state.service';
import { AuthService } from '../../shared/auth.service';
import {Router} from '@angular/router';

export class User{
  id!:number;
  name!:String;
  email!:String;
  role_id!:number;
} 

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {
  peticiones!: Peticion[];
  isLoading = true;
  isSignedIn!: boolean;
  user: User=new User();
  errors:any=null;


  constructor(public peticionservice:PeticionService,private auth: AuthStateService, private authService:AuthService,  private router: Router) {
   
 
   }

  ngOnInit(): void {
     this.peticionservice.index().subscribe(
      (data:any)=>{
        this.peticiones=data;
      },
      (error) => {
        this.errors = error.error.error
      }
    );
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
      if(this.isSignedIn){
        this.authService.profileUser().subscribe((data:any)=>{
        this.user=data;  
        console.log(data)
        this.isLoading = false;
        });
      }
      
    });
  }

  onFirmarPeticion(id:any ){
    if(id){
      this.peticionservice.firmar(id.toString()).subscribe(
        () => {
          this.router.navigate(['/ruta-destino']);
        },
        (error) => {
          this.errors = error.error.error;
        }
      );
    }
  }

  onDelete(id:any){
    if(id){
      this.peticionservice.delete(id.toString()).subscribe(
        () => {
          this.router.navigate(['/ruta-destino']);
        },
        (error) => {
          this.errors = error.error.error;
        }
      );
    }
  }
  onEstado(id:any){
    if(id){
      this.peticionservice.estado(id.toString()).subscribe(
        () => {
          this.router.navigate(['/ruta-destino']);
        },
        (error) => {
          this.errors = error.error.error;
        }
      );
    }
  }

  isOwner(id:any){
    console.log(this.user.id , id)
    return this.user.id == id ||this.user.role_id == 1;
  }

}
