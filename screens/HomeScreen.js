import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { Button } from 'react-native-elements';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { firebase } from '../firebase';

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleSignOut = () => {
        firebase.auth()
            .signOut()
            .then(() => {
                navigation.replace("Login");
            })
            .catch(error => console.log("Fehler beim abmelden"));
    }

    useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }
        if (token) {
            await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({ token }, { merge: true });
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('../images/logo_small.webp')} style={styles.logo} />
            <Text>Email: {firebase.auth().currentUser.email}</Text>
            <Button title="Abmelden" onPress={handleSignOut} containerStyle={styles.buttonContainer} buttonStyle={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: "60%",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#007ac5",
        borderRadius: 10,
    },
    logo: {
        alignSelf: "center",
        marginTop: 40,
        marginBottom: 20,
        width: 100,
        height: 70,
    },
});

export default HomeScreen;
