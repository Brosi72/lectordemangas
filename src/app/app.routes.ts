import { Routes } from '@angular/router';
import { ExplorarComponent } from './components/explorar/explorar.component';
import { MangaRandomComponent } from './components/manga-random/manga-random.component';
import { MangaDetailComponent } from './components/manga-detail/manga-detail.component';



export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent) },
    {path: 'mi-lista', loadComponent: () => import('./components/mi-lista/mi-lista.component').then(m => m.MiListaComponent)},
    {path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)},
    {path: 'explorar', component: ExplorarComponent},
    {path:'random',component:MangaRandomComponent},
    {path:'manga-detail/:id',component:MangaDetailComponent}
];  
