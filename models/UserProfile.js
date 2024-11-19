export class UserProfile {
  constructor(uid, email, name, createdAt) {
    this.uid = uid;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
    this.lastActive = new Date();
    this.totalTranscripts = 0;
    this.totalFlashcards = 0;
    this.totalSummaries = 0;
  }

  toJSON() {
    return {
      uid: this.uid,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
      lastActive: this.lastActive,
      totalTranscripts: this.totalTranscripts,
      totalFlashcards: this.totalFlashcards,
      totalSummaries: this.totalSummaries,
    };
  }
} 