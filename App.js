import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';

// Importing Screens
import WelcomeScreen from './screens/Welcome';
import HomeScreen from './screens/Home';
import NotebookScreen from './screens/Notebook';

import RecordLectureScreen from './screens/tools/RecordLecture';
import ScanDocumentScreen from './screens/tools/ScanDoc';
import UploadDocumentScreen from './screens/tools/UploadDoc';
import YoutubeTranscriptScreen from './screens/tools/YtTranscript';

import TranscriptScreen from './screens/Transcript';

import SummaryScreen from './screens/products/Summary';
import FlashcardsScreen from './screens/products/Flashcards';
import YoutubeSuggestionsScreen from './screens/products/YtSuggestions';

import FlashcardSessionScreen from './screens/fsessions/Session';
import FlashcardSessionResultScreen from './screens/fsessions/Result';

import LoginScreen from './screens/auth/Login';
import SignupScreen from './screens/auth/Signup';
import ProfileScreen from './screens/auth/Profile';
import HistoryScreen from './screens/History';

import { AuthProvider } from '../contexts/AuthContext';

const Stack = createStackNavigator();
const DefaultTheme = MD3DarkTheme;
DefaultTheme.colors = {
    ...MD3DarkTheme.colors,
    background: '#111',
    surface: '#1d1d1d',
    surfaceVariant: '#2d2c2e',
    onTertiary: '#946300',
    tertiaryContainer: '#eb9d02',
}
// "tertiary": "rgb(128, 81, 88)", 
// "onTertiary": "rgb(255, 255, 255)",
// "tertiaryContainer": "rgb(255, 217, 221)",
// "onTertiaryContainer": "rgb(50, 16, 23)",

export default function App() {
    return (
        <AuthProvider>
            <PaperProvider theme={DefaultTheme}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Welcome" screenOptions={{
                        presentation: 'modal',
                        headerStyle: {
                            backgroundColor: DefaultTheme.colors.primaryContainer,
                            elevation: 0,
                        },
                        headerTintColor: DefaultTheme.colors.onPrimaryContainer, // Text color for the header
                    }}>
                        <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Notebook" component={NotebookScreen} />

                        <Stack.Screen name="RecordLecture" component={RecordLectureScreen} />
                        <Stack.Screen name="ScanDocument" component={ScanDocumentScreen} />
                        <Stack.Screen name="YoutubeTranscript" component={YoutubeTranscriptScreen} />
                        <Stack.Screen name="UploadDocument" component={UploadDocumentScreen} />

                        <Stack.Screen name="Transcript" component={TranscriptScreen} />
                        <Stack.Screen name="Summary" component={SummaryScreen} />
                        <Stack.Screen name="Flashcards" component={FlashcardsScreen} />
                        <Stack.Screen name="YoutubeSuggestions" component={YoutubeSuggestionsScreen} />

                        <Stack.Screen name="FlashcardSession" component={FlashcardSessionScreen} />
                        <Stack.Screen name="FlashcardSessionResult" component={FlashcardSessionResultScreen} />

                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        <Stack.Screen name="History" component={HistoryScreen} />

                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </AuthProvider>
    );
}
