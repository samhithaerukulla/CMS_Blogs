import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-saved-content',
  templateUrl: './saved-content.component.html',
  styleUrls: ['./saved-content.component.css']
})
export class SavedContentComponent  {



  savedTitles:any[] = [];
  
  data: any = {
    title: '',
    tags: '',
    content: '',
    publish: true,
    date: ''
  };

  constructor(private http: HttpClient,private router:Router) {
    this.fetchSavedTitles();
  }
  
  redirect(){
    this.router.navigate(['/new'])
   }
 

   fetchSavedTitles() {
    // Retrieve the user ID from local storage
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      this.http.get<any[]>(`http://localhost:3000/pages/titles/${userId}`).subscribe(
        (response: any) => {
          console.log(response)
          this.savedTitles = response;
        },
        (error) => {
          console.error('Error fetching saved titles:', error);
        }
      );
    } else {
      console.error('User ID not found in local storage');
    }
  }

  redirectToEdit(savedTitle: string): void {
    // Assuming you have a route named 'edit' that corresponds to the edit component
    console.log(savedTitle)
    this.router.navigate(['/edit'], { queryParams: { savedTitle: savedTitle } });



  
}
}
