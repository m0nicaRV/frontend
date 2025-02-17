import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import { Peticion } from '../peticion';
import { PeticionService } from '../peticion.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  peticionForm!: FormGroup;
  errors:any=null;
  peticion!: Peticion; 

  constructor( public router:Router , public PeticionService: PeticionService, public token:TokenService) {
   }

  ngOnInit(): void {
    this.peticionForm= new FormGroup({
      titulo: new FormControl('',[Validators.required]),
      descripcion: new FormControl('',[Validators.required]),
      destinatario: new FormControl('',[Validators.required]),
      categoria_id: new FormControl('',[Validators.required]),
      
    })
  }

  onSubmit(){
    if (this.peticionForm.valid) {
      const peticion: Peticion = {
        titulo: this.peticionForm.value.titulo,
        descripcion: this.peticionForm.value.descripcion,
        destinatario: this.peticionForm.value.destinatario,
        firmantes: 0,
        estado: 'pendiente', 
        categoria_id: Number(this.peticionForm.value.categoria_id),
      };

    if(this.token.isLoggedIn()){
      this.PeticionService.create(peticion).subscribe(
        (result)=>{
          console.log(result);
        },
        (error)=>{
          this.errors=error.error;
        },
        ()=>{
          this.peticionForm.reset();
          this.router.navigate(['/']);
        }
        
      );
    }
    
  }

  }

}
