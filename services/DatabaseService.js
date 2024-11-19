import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';

export const DatabaseService = {
  // Save transcript
  async saveTranscript(userId, transcript) {
    try {
      const docRef = await addDoc(collection(db, 'transcripts'), {
        userId,
        content: transcript,
        createdAt: new Date(),
      });
      
      await this.logActivity(userId, 'transcript', 'Created new transcript');
      return docRef.id;
    } catch (error) {
      console.error('Error saving transcript:', error);
      throw error;
    }
  },

  // Save flashcards
  async saveFlashcards(userId, flashcards) {
    try {
      const docRef = await addDoc(collection(db, 'flashcards'), {
        userId,
        cards: flashcards,
        createdAt: new Date(),
      });
      
      await this.logActivity(userId, 'flashcards', 'Generated new flashcards');
      return docRef.id;
    } catch (error) {
      console.error('Error saving flashcards:', error);
      throw error;
    }
  },

  // Log user activity
  async logActivity(userId, type, description) {
    try {
      await addDoc(collection(db, 'activities'), {
        userId,
        type,
        description,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  },

  // Update user profile
  async updateProfile(userId, profileData) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...profileData,
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  async updateLastActive(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        lastActive: new Date(),
      });
    } catch (error) {
      console.error('Error updating last active timestamp:', error);
    }
  },
}; 