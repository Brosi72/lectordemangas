import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environment';

// Inicializa Firebase usando la configuración del entorno
const app = initializeApp(environment.firebase);
export const auth = getAuth(app);