

import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var CKEDITOR: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements AfterViewInit {
  data = {
    userid: '',
    title: '',
    tags: '',
    content: '',
    publish: true,
    date: '',
  };

  @ViewChild('ckeditor', { static: true }) ckeditor!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit() {
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
        { name: 'about', items: ['About'] },
      ],
    });
  }

  saveContent() {
    const userId = localStorage.getItem('userId') || '';
    this.data.userid = userId;

    // Get the CKEditor instance
    const editorInstance = CKEDITOR.instances[this.ckeditor.nativeElement.id];

    if (editorInstance && editorInstance.getData) {
      // Get the HTML content from CKEditor
      const htmlContent = editorInstance.getData();

      // Save the content to the backend
      this.http
        .post('http://localhost:3000/pages', { ...this.data, content: htmlContent }, { responseType: 'text' })
        .subscribe(
          () => {
            window.alert('Content saved successfully');
            console.log('Content saved successfully');
            this.router.navigate(['/pages']);

          },
          (error) => {
            window.alert('Error saving content');
            console.error('Error saving content:', error);
          }
        );
    }
  }

  cancel() {
    this.router.navigate(['/pages']);
  }
}


