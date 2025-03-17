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
} 
@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})

export class MineComponent implements OnInit {
  isLoading = true;
  peticiones!: Peticion[];
  isSignedIn!: boolean;
  user: User=new User();
  errors:any=null;

constructor(public peticionservice:PeticionService,private auth: AuthStateService, private authService:AuthService,  private router: Router) {
    
    this.peticionservice.myPeticiones().subscribe(
      (data:any)=>{
        this.peticiones=data;
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

  ngOnInit(): void {
  }

  onFirmarPeticion(id:any ){
    if(id){
      this.peticionservice.firmar(id.toString()).subscribe(
        () => {
          window.location.reload(); // Recarga la página después de firmar la petición
        },
        (error) => {
          this.errors = error.error.error;
        }
      );
    }
  }

  onDelete(id:any){}

  isOwner(id:any){
    console.log(this.user.id , id)
    return this.user.id == id;
  }


}
