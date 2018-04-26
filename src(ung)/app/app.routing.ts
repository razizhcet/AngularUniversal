import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

import { RouterModule, Routes } from '@angular/router';



export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'blog', component: BlogComponent },
   
    { path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
  ];