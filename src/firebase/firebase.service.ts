/* eslint-disable prettier/prettier */
// firebase.service.ts

import { Injectable } from '@nestjs/common';
import { admin } from './firebase.config';

@Injectable()
export class FirebaseService {
  private readonly firestore: FirebaseFirestore.Firestore;

  constructor() {
    this.firestore = admin.firestore();
  }

  async getData(collection: string): Promise<any[]> {
    try {
      const snapshot = await this.firestore.collection(collection).get();
      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
      throw error;
    }
  }

  // Agrega más métodos según las necesidades de tu aplicación
}
