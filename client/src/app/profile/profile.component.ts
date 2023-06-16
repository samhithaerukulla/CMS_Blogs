import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {
    firstname: '',
    lastname: '',
    Username: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    // Call the method to fetch user details based on the user ID
    this.fetchUserDetails(userId);
    
  }

  fetchUserDetails(userId: string | null) {
    // Make an HTTP GET request to fetch user details from the server
    this.http.get<any>(`http://localhost:3000/user/profile/${userId}`).subscribe(
      (response: any) => {
        console.log(response);
        // Assign the retrieved user details to the 'user' object
        this.user.firstname = response.firstname;
        this.user.lastname = response.lastname;
        this.user.Username = response.Username;
        this.user.email = response.email;
        this.user.password=response.password;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  updateProfile() {
    
    this.http.put('http://localhost:3000/profile', this.user).subscribe(
      () => {
        console.log('Profile updated successfully');
        // Perform any additional actions after successful update
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }
}
