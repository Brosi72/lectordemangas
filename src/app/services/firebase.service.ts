import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { environment } from '../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app;
  private db;

  constructor() {
    // Initialize Firebase using the environment configuration
    this.app = initializeApp(environment);
    this.db = getFirestore(this.app); // Firestore instance
  }

  async saveFavoritesToFirestore(favorites: any[], userId: string) {
    try {
      const userDocRef = doc(this.db, 'usuarios', userId);

      // Fetch the current document to merge data
      const userDocSnapshot = await getDoc(userDocRef);

      // Prepare the data to update
      const updatedData = {
        mangasFavoritos: favorites // Overwrite or merge the array
      };

      // Update the document
      if (userDocSnapshot.exists()) {
        await updateDoc(userDocRef, updatedData);
      } else {
        await setDoc(userDocRef, updatedData);
      }

      console.log('Favorites successfully saved to Firestore.');
    } catch (error) {
      console.error('Error saving favorites to Firestore:', error);
    }
  }
}