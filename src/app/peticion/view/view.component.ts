import { Component, OnInit } from '@angular/core';
import { Peticion } from '../peticion';
import { PeticionService } from '../peticion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  peticion!: Peticion;
  id :string | null = '';
  constructor(public peticionservice:PeticionService , private route: ActivatedRoute) {
    this.peticionservice.show(this.id).subscribe(
      (data:any)=>{
        console.log(data);
        this.peticion=data[0];
      }
    );
  
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
