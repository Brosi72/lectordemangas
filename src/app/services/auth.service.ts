import { Injectable } from '@angular/core';
import { auth } from './firebase.init'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  loginUser(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem('currentUser', JSON.stringify(userCredential.user));
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        throw error;
      });
  }

  registerUser(email: string, password: string): Promise<void> {
    console.log('Attempting to register user with email:', email, 'and password:', password);
  
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User registered successfully:', userCredential.user);
      })
      .catch((error) => {
        console.error('Firebase error code:', error.code);
        console.error('Firebase error message:', error.message);
        throw error; // Re-lanza el error para su manejo posterior
      });
  }
  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  logout(): void {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('currentUser');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}