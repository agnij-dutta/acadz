import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import { db, auth } from '../firebase/config';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const HistoryScreen = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const q = query(
        collection(db, 'activities'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const activities = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setActivities(activities);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderActivity = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp.toDate()).toLocaleString()}
        </Text>
        <Text style={styles.activityType}>{item.type}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        renderItem={renderActivity}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
  },
  activityType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryScreen; 