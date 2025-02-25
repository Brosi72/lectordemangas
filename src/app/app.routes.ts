import { Routes } from '@angular/router';
import { ExplorarComponent } from './components/explorar/explorar.component';
import { MangaRandomComponent } from './components/manga-random/manga-random.component';
import { MangaDetailComponent } from './components/manga-detail/manga-detail.component';
import { RegisterComponent } from './components/register/register.component';



export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent) },
    {path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)},
    {path: 'explorar', component: ExplorarComponent},
    {path:'random',component:MangaRandomComponent},
    {path:'manga-detail/:id',component:MangaDetailComponent},
    {path:'register', loadComponent: ()=>import('./components/register/register.component').then(m=>m.RegisterComponent)},
];  
