import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';
import { UserProfile } from '../models/UserProfile';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const loadUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      
      if (!userDoc.exists()) {
        // Create new profile if it doesn't exist
        const newProfile = new UserProfile(
          uid,
          auth.currentUser.email,
          auth.currentUser.displayName || 'User',
          new Date()
        );
        await setDoc(doc(db, 'users', uid), newProfile.toJSON());
        setUserProfile(newProfile);
        return newProfile;
      }

      const userData = userDoc.data();
      setUserProfile(userData);
      return userData;
    } catch (error) {
      console.error('Error loading user profile:', error);
      Alert.alert('Error', 'Failed to load user profile');
      return null;
    }
  };

  const checkInactivity = async (userData) => {
    if (!userData?.lastActive) return false;
    
    const lastActive = userData.lastActive.toDate();
    const hoursInactive = (new Date() - lastActive) / (1000 * 60 * 60);
    
    if (hoursInactive > 72) {
      try {
        await signOut(auth);
        Alert.alert('Session Expired', 'Please login again');
        return true;
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }
    return false;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userData = await loadUserProfile(user.uid);
          if (userData && !(await checkInactivity(userData))) {
            setUser(user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userProfile,
    loading,
    refreshProfile: () => user && loadUserProfile(user.uid),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 