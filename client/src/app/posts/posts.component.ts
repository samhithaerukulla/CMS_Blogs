import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any[] = [];
  

  constructor(private http: HttpClient,private router:Router) {
    // Retrieve the published posts from the server
    this.getPublishedPosts();
  }

  getPublishedPosts() {
    this.http.get<any[]>('http://localhost:3000/posts').subscribe(
      posts => {
        this.posts = posts;
      },
      error => {
        console.error('Error retrieving posts', error);
      }
    );
  }
  redirect(title:string){
    this.router.navigate(['/show'],{ queryParams: { Title: title } });

  }
}


