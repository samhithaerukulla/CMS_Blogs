import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import{ HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SavedContentComponent } from './saved-content/saved-content.component';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NavComponent } from './nav/nav.component';
import { ShowdataComponent } from './showdata/showdata.component';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    SavedContentComponent,
    EditComponentComponent,
    PostsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavComponent,
    ShowdataComponent,
    HomeComponent,


  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DropDownListModule, 
    RichTextEditorModule,
    RichTextEditorAllModule
   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


