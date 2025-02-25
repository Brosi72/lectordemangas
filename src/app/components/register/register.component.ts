import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-box">
        <h2>Registrarse</h2>
        <form (ngSubmit)="register()">
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
          <div class="input-group">
            <input
              type="password"
              [(ngModel)]="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              required
              class="input-field"
            />
          </div>
          <div class="input-group">
            
          </div>
          <button type="submit" class="btn-submit">Registrarse</button>
        </form>
        <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mangasFavoritos: string = '';  // Nueva variable para mangas favoritos
  errorMessage: string = '';
  private router = inject(Router);

  constructor() {
    // Inicializa Firebase
    initializeApp(environment.firebase);
  }

  // Lógica para el registro de usuario
  async register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    const auth = getAuth();
    const db = getFirestore();
    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
      const user = userCredential.user;

      // Guardar los detalles del usuario en Firestore
      const userDocRef = await addDoc(collection(db, 'usuarios'), {
        uid: user.uid,  // Guardamos el UID del usuario
        email: this.email,
        password: this.password,  // En un entorno real, nunca se debería guardar la contraseña en texto plano
        mangasFavoritos: this.mangasFavoritos.split(',').map(manga => manga.trim()),  // Convertir la cadena en una lista de mangas favoritos
      });

      console.log('Usuario registrado en Firestore:', userDocRef.id);

      // Guardamos la información del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('loginCompleted', 'true');
      
      // Redirige al home después de 1 segundo
      setTimeout(() => {
        this.router.navigate(['/main']);
      }, 500);
    } catch (error: unknown) {  // Especificamos 'unknown' como tipo del error
      if (error instanceof Error) {  // Comprobamos si 'error' es una instancia de 'Error'
        const errorCode = (error as any).code;  // Usamos el tipo 'any' temporalmente para acceder a 'code'
        switch (errorCode) {
          case 'auth/email-already-in-use':
            this.errorMessage = 'El correo electrónico ya está en uso.';
            break;
          case 'auth/invalid-email':
            this.errorMessage = 'Correo electrónico inválido.';
            break;
          case 'auth/weak-password':
            this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
            break;
          default:
            this.errorMessage = 'Hubo un error al registrar el usuario.';
        }
      } else {
        this.errorMessage = 'Ocurrió un error desconocido.';
      }
      console.error('Error al registrar el usuario:', error);
    }
  }
}
