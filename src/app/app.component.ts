import { Component, OnInit } from '@angular/core';
import { MangaService } from './services/manga-service.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet,FooterComponent,NavbarComponent],
  standalone: true,
  providers: [MangaService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'lectordemangas';
}

