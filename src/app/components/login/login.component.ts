import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  
    <div class="login-container">
      <div class="login-box">
        <h2>Iniciar sesión</h2>
        <form (ngSubmit)="login()">
          <div class="input-group">
            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              placeholder="Correo electrónico"
              required
              class="input-field"
            />
          </div>
          <div class="input-group">
            <input
              type="password"
              [(ngModel)]="password"
              name="password"
              placeholder="Contraseña"
              required
              class="input-field"
            />
          </div>
          <button type="submit" class="btn-submit">Iniciar sesión</button>
        </form>
        <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  private router = inject(Router);

  constructor() {
    // Inicializa Firebase
    initializeApp(environment);
  }

  // Lógica para el login
async login() {
  const db = getFirestore();
  try {
    // Realiza una consulta en la colección 'usuarios' para buscar al usuario por email
    const q = query(collection(db, 'usuarios'), where('email', '==', this.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Si el usuario existe, verificamos la contraseña
      const user = querySnapshot.docs[0].data(); // Asumimos que hay un solo documento que coincide con el correo

      if (user['password'] === this.password) {
        console.log('Usuario encontrado.');

        // Guardamos la información del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        // Establecemos la bandera para indicar que es la primera vez después del login
        localStorage.setItem('loginCompleted', 'true');

        // Redirige al home después de 1 segundo
        setTimeout(() => {
          this.router.navigate(['/main']);  // Redirige a la ruta /main
        }, 500); // 1000 ms = 1 segundo
        
      } else {
        this.errorMessage = 'Contraseña incorrecta.';
        console.log('Contraseña incorrecta.');
      }
    } else {
      this.errorMessage = 'Correo o contraseña incorrectos.';
      console.log('Usuario no encontrado.');
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    this.errorMessage = 'Hubo un error al procesar el login.';
  }
}}

