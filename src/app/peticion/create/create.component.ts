import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import { Peticion } from '../peticion';
import { PeticionService } from '../peticion.service';


export class User{
  name!:string;
  email!:string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  peticionForm!: FormGroup;
  errors:any=null;
  user!: User
  selectedImage!: any;
 

  constructor( public router:Router , public PeticionService: PeticionService, public token:TokenService) {
  
  }

  ngOnInit(): void {
    this.peticionForm= new FormGroup({
      titulo: new FormControl('',[Validators.required]),
      descripcion: new FormControl('',[Validators.required]),
      destinatario: new FormControl('',[Validators.required]),
      categoria_id: new FormControl('',[Validators.required]),
      image: new FormControl('',[Validators.required])
      
    })
  }
  onFileChange(event:any){
    if(event.target.files.length > 0){
        this.selectedImage = event.srcElement.files[0];
    }
  }

  onSubmit(){
   
      /*const peticion: Peticion = {
        titulo: this.peticionForm.value.titulo,
        descripcion: this.peticionForm.value.descripcion,
        destinatario: this.peticionForm.value.destinatario,
        categoria_id: Number(this.peticionForm.value.categoria_id),*/
        const peticion = new FormData();
        peticion.append('titulo', this.peticionForm.value.titulo);
        peticion.append('descripcion', this.peticionForm.value.descripcion);
        peticion.append('destinatario', this.peticionForm.value.destinatario);
        peticion.append('categoria_id', this.peticionForm.value.categoria_id.toString());
        peticion.append('file', this.selectedImage);
        console.log(peticion);

      if(this.token.isLoggedIn()){
      this.PeticionService.create(peticion).subscribe((res:any)=>{
        console.log('peticion realizada con exito ')
        this.router.navigate(['/peticiones']);
      });
    }
    
  }

  }

