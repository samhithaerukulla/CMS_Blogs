// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// declare var tinymce: any;


// @Component({
//   selector: 'app-edit-component',
//   templateUrl: './edit-component.component.html',
//   styleUrls: ['./edit-component.component.css']
// })
// export class EditComponentComponent implements OnInit, AfterViewInit {
//   savedTitle!: string;
  
//   data: any = {
//     title: '',
//     tags: '',
//     content: '',
//     publish: true,
//     date: ''
//   };

//   constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

//   ngOnInit(): void {
//     const savedTitle = this.route.snapshot.queryParamMap.get('savedTitle');

//   if (savedTitle) {
 
//     this.savedTitle = savedTitle;
//     this.loadContent(this.savedTitle);
   
//     };
//   }
  

//   loadContent(title: string) {
//     console.log(title)
//     this.http.get(`http://localhost:3000/pages/${title}`).subscribe(
//       (response: any) => {
//         console.log(response);
//         this.data.title = response.title;
//         this.data.tags = response.tags;
//         this.data.content = response.content;
//         this.data.publish = response.publish;
//         this.data.date = response.date;
//       },
//       (error) => {
//         console.error('Error loading content:', error);
//       }
//     );
//   }



//   redirectToEdit(savedTitle: string): void {
//     this.router.navigate(['/edit', savedTitle]);
//   }

//   saveContent(): void {
//     // Save the form data
//     const cleanedContent = this.stripHtmlTags(this.data.content.toString());
//     const url = `http://localhost:3000/pages/${encodeURIComponent(this.savedTitle)}`; // Update URL with savedTitle
//     this.http.put(url, { ...this.data, content: cleanedContent }).subscribe(
//       () => {
//         window.alert('Content updated successfully');
//         console.log('Content updated successfully');

//       },
//       (error) => {
//         window.alert('Error updating content');
//         console.error('Error updating content:', error);
//       }
//     );
//   }
  

//   cancel(): void {
//     this.router.navigate(['/pages'])
//   }
  

    

//   del(){
//     this.http.delete(`http://localhost:3000/pages/${this.savedTitle}`).subscribe(
//       () => {
//         console.log('Page deleted successfully.');
//         // Perform any additional actions after successful deletion
//         this.router.navigate(['/pages'])
//       },
//       (error) => {
//         console.error('Error deleting page:', error);
//       }
//     );
//   }

  

//   stripHtmlTags(html: string): string {
//     const div = document.createElement('div');
//     div.innerHTML = html;
//     return div.textContent || div.innerText || '';
//   }

//   ngAfterViewInit(): void {
//     this.loadTinyMCE();
//   }

//   loadTinyMCE(): void {
//     const apiKey = 'bx4q0et5zuejx7eb7sg8ekedb8oqco00jyq5q2rlr2j2wdtu';
//     const scriptSrc = `https://cdn.tiny.cloud/1/${apiKey}/tinymce/5/tinymce.min.js`;

//     const scriptElement = document.createElement('script');
//     scriptElement.src = scriptSrc;
//     scriptElement.onload = () => {
//       tinymce.init({
//         selector: '#content',
//         plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode ',
//         toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
//         setup: (editor: any) => {
//           editor.on('init', () => {
//             editor.setContent(this.data.content); // Set the initial content
//           });
//           editor.on('change', () => {
//             this.data.content = editor.getContent(); // Update the content in the data object
//           });
//         },
//       });
//     };

//     document.head.appendChild(scriptElement);
//   }
// }

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var CKEDITOR: any;

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit, AfterViewInit {
  savedTitle!: string;
  
  data: any = {
    title: '',
    tags: '',
    content: '',
    publish: true,
    date: ''
  };

  @ViewChild('ckeditor', { static: true }) ckeditor!: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const savedTitle = this.route.snapshot.queryParamMap.get('savedTitle');

    if (savedTitle) {
      this.savedTitle = savedTitle;
      this.loadContent(this.savedTitle);
    }
  }



  loadContent(title: string) {
    const url = `http://localhost:3000/pages/${title}`;
  
    this.http.get(url).subscribe(
      (response: any) => {
        console.log(response);
        this.data.title = response.title;
        this.data.tags = response.tags;
        this.data.content = response.content;
        this.data.publish = response.publish;
        this.data.date= response.date;
  
        CKEDITOR.instances[this.ckeditor.nativeElement.id].setData(this.data.content);
      },
      (error) => {
        console.error('Error loading content:', error);
      }
    );
  }


  

  saveContent(): void {
    const url = `http://localhost:3000/pages/${encodeURIComponent(this.savedTitle)}`; // Update URL with savedTitle
  
    const requestBody = {
      ...this.data,
      content: this.data.content
    };
  
    this.http.put(url, requestBody).subscribe(
      () => {
        window.alert('Content updated successfully');
        console.log('Content updated successfully');
        this.router.navigate(['/pages']);

      },
      (error) => {
        window.alert('Error updating content');
        console.error('Error updating content:', error);
      }
    );
  }
  

  cancel(): void {
    this.router.navigate(['/pages']);
  }

  stripHtmlTags(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  ngAfterViewInit(): void {
    this.loadCKEditor();
  }

  loadCKEditor(): void {
    CKEDITOR.replace(this.ckeditor.nativeElement, {
      toolbar: [
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Blockquote'] },
        { name: 'links', items: ['Link', 'Unlink'] },
        { name: 'tools', items: ['Maximize'] },
        { name: 'document', items: ['Source'] },
        '/',
        { name: 'styles', items: ['Styles', 'Format'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'insert', items: ['Image', 'Table', 'HorizontalRule'] },
        { name: 'editing', items: ['Undo', 'Redo'] },
        { name: 'others', items: ['ShowBlocks'] },
        { name: 'about', items: ['About'] }
      ]
    });
    CKEDITOR.instances[this.ckeditor.nativeElement.id].setData(this.data.content);
    CKEDITOR.instances[this.ckeditor.nativeElement.id].on('change', () => {
      this.data.content = CKEDITOR.instances[this.ckeditor.nativeElement.id].getData();
    });
  }

  del() {
    this.http.delete(`http://localhost:3000/pages/${this.savedTitle}`).subscribe(
      () => {
        console.log('Page deleted successfully.');
        // Perform any additional actions after successful deletion
        this.router.navigate(['/pages']);
      },
      (error) => {
        console.error('Error deleting page:', error);
      }
    );
  }
}
