import React, { useEffect } from "react";
import { View, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Images } from "../constants/";
import { useTheme, Button, Text, IconButton } from "react-native-paper";
import { useAuth } from '../contexts/AuthContext';

const app_info = `
Version: 0.2.1a (alpha)
Date: 19-11-2024
Devs: Mohikshit Ghorai, Pritam Das, Suparno Saha, Agnij Dutta, Mainak Dasgupta

`.trim();

export default function WelcomeScreen({ navigation }) {
    const theme = useTheme();
    const styles = createStyles(theme);
    const { user, loading } = useAuth();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (<IconButton
                icon="information-outline"
                onPress={() => Alert.alert('App Info', app_info)}
                iconColor={theme.colors.onPrimaryContainer}
            />)
        });

        // Auto-navigate based on auth state
        if (!loading) {
            if (user) {
                navigation.replace('Home');
            }
        }
    }, [loading, user]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.animatedImage}
                source={Images.studentAnimated}
                resizeMode="contain"
            />
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>
                    Welcome to <Text style={styles.boldText}>AcadZ</Text>
                </Text>
            </View>

            <Button
                icon="chevron-right"
                mode="outlined"
                style={styles.button}
                onPress={() => navigation.navigate("Login")}>
                Get Started
            </Button>
        </View>
    );
}


const createStyles = theme => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: theme.colors.background,
    },
    animatedImage: {
        height: 100,
        width: 100,
        marginLeft: 10,
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    welcomeText: {
        fontSize: 18,
        color: "white",
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    boldText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        marginHorizontal: 16,
        marginBottom: 16,
    },

    infoText: {
        borderTopWidth: 1,
        borderColor: theme.colors.tertiary,
        paddingTop: 15,
        marginTop: 15,
        color: theme.colors.tertiary,
        paddingHorizontal: 16,
    }
});