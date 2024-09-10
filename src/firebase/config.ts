import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyDavq8_VxopLoj-WctqudXwYpGlsvGW0ik",
  authDomain: "compras-2cfd9.firebaseapp.com",
  projectId: "compras-2cfd9",
  storageBucket: "compras-2cfd9.appspot.com",
  messagingSenderId: "641349656261",
  appId: "1:641349656261:web:715c68c8f1fd768ece1aac",
  measurementId: "G-7H3NV4JF67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadFile(file: File): Promise<string> {
  try {
    const storageRef = ref(storage, `images/${uuidv4()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Archivo subido exitosamente:', snapshot);
    const url = await getDownloadURL(snapshot.ref);
    console.log('URL de la imagen:', url); // Verifica que la URL se obtenga correctamente
    return url;
  } catch (error) {
    console.error('Error subiendo el archivo:', error);
    throw error;
  }
}

export async function deleteFile(fileUrl: string): Promise<void> {
  try {
    // Obtener la referencia del archivo desde la URL
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
    console.log('Archivo eliminado exitosamente:', fileUrl);
  } catch (error) {
    console.error('Error eliminando el archivo:', error);
    throw error;
  }
}
