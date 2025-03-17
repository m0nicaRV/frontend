import { Component, OnInit } from '@angular/core';
import { Peticion } from '../peticion';
import { PeticionService } from '../peticion.service';
import { ActivatedRoute } from '@angular/router';
import { AuthStateService } from '../../shared//auth-state.service';
import { AuthService } from '../../shared/auth.service';


export class User{
  id!:number;
  name!:String;
  email!:String;
  role_id!:number;
} 

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  peticion!: Peticion;
  isLoading = true;
  error : any;
  isSignedIn!: boolean;
  user: User=new User();
  errors:any=null;


  constructor(public peticionservice:PeticionService , private route: ActivatedRoute,private auth: AuthStateService, private authService:AuthService) {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.peticionservice.show(id).subscribe(
        (data: any) => {
          this.peticion = data[0];
          this.isLoading = false;
        },
        (error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
   }
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

  ngOnInit(): void {}

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

  onDelete(id:any){
    if(id){
      this.peticionservice.delete(id.toString()).subscribe(
        () => {
          window.location.reload(); // Recarga la página después de firmar la petición
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
          window.location.reload(); // Recarga la página después de firmar la petición
        },
        (error) => {
          this.errors = error.error.error;
        }
      );
    }
  }

  isOwner(id:any){
    console.log(this.user.id , id)
    return this.user.id == id || this.user.role_id == 1;
  }



}
