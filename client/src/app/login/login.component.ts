import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  regForm: FormGroup;

  constructor(private http: HttpClient, private route: Router) {
    this.regForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
    const jwtToken = localStorage.getItem('adminJwtToken')
    if (jwtToken){
      this.route.navigate(['/admin/post'])
    }
    const token = localStorage.getItem("jwtToken")
    if (token) {
      this.route.navigate(['/posts'])
    }
  }

  onSubmit(details = { email: String, password: String }): void {
    this.http.post('http://localhost:3000/login', details).subscribe(
      (response: any) => {
        console.log(response)
        if(response && response.user._id){
          localStorage.setItem('userId',response.user._id)
        }
        if (response && response.token) {
          window.alert('User Login Successfully!');
          this.route.navigate(['/posts']);
          localStorage.setItem('jwtToken', response.token);
        } else {
          this.route.navigate(['/admin/post']);
          localStorage.setItem('adminJwtToken', response.jwtTtoken);
          window.alert('Admin Login Successfully!');
        }
      },
      (error) => {
        console.error(error);
        window.alert('Login failed! Email or Password is wrong');
      }
    );
  }



}
