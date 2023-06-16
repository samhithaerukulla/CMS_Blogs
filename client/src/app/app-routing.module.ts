import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SavedContentComponent } from './saved-content/saved-content.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { ContentComponent } from './content/content.component';
import { NavComponent } from './nav/nav.component';
import { ShowdataComponent } from './showdata/showdata.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'edit',component:EditComponentComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'pages',component:SavedContentComponent},
  {path:'posts',component:PostsComponent},
  {path:'profile',component:ProfileComponent},
  {path:'new',component:ContentComponent},
  
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'show',component:ShowdataComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
