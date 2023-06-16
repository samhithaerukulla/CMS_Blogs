import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  user=false
  
  constructor(private route:Router){
    const user=localStorage.getItem('jwtToken')
   
    if(user){
      this.user=true

    }
    
  }

  onlogout(){

    localStorage.clear()
  
    this.route.navigate(['/login'])
    alert('logout sucessful')
   }

   

}
