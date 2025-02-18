import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent) },
    { path: 'manga/:id', loadComponent: () => import('./components/manga-detail/manga-detail.component').then(m => m.MangaDetailComponent) },
    {path: 'mi-lista', loadComponent: () => import('./components/mi-lista/mi-lista.component').then(m => m.MiListaComponent)},
    {path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)},
    {path: 'explorar', loadComponent: () => import('./components/explorar/explorar.component').then(m => m.ExplorarComponent)},
    
];  
