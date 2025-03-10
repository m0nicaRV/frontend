import { Component, OnInit } from '@angular/core';
import { Peticion } from '../peticion';
import { PeticionService } from '../peticion.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  peticiones!: Peticion[];
  constructor(public peticionservice:PeticionService) {
    this.peticionservice.index().subscribe(
      (data:any)=>{
        this.peticiones=data;
      }
    );
  
   }

  ngOnInit(): void {
  }

}
