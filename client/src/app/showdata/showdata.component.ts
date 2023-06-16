import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showdata',
  templateUrl: './showdata.component.html',
  styleUrls: ['./showdata.component.css']
})
export class ShowdataComponent {
  List: any[] = [];
  titles: string | null = null;
  data:String=""

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.titles = params.get('Title');
      
      this.fetchDetails();
      console.log(this.data);
    });
  }

  fetchDetails() {
    this.http.get<any>(`http://localhost:3000/show/${this.titles}`).subscribe(
      (response: any) => {
        
        this.data = response.content;
      
  
        const container = document.createElement('div');
        const content=document.getElementById('content')
        container.innerHTML = response.content;
        
        const elements = Array.from(container.children);
        this.List = elements.map((element: Element) => {
          const inlineStyle = (element as HTMLElement).getAttribute('style');
          const content = element.textContent || '';
          return {
            style: inlineStyle,
            content: content.replace(/\\n/g, ' ') // Replace newlines with spaces
          };
        });
        console.log(container)
        content?.appendChild(container)
      },
      (error) => {
        console.error('Error fetching page:', error);
      }
    );
  }
  
  }
  
  
  

