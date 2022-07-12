import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native'
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
        (() => registerForPushNotificationsAsync())();
    }, []);

    //expo push-notifications
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
            const res = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({ token }, { merge: true });
        }
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    return (
        <View style={styles.container}>
            <Image source={require('../images/logo_small.webp')} style={styles.logo} />
            <Text>Email: {firebase.auth().currentUser.email}</Text>
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Abmelden</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#007ac5',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    logo: {
        alignSelf: "center",
        marginTop: 40,
        marginBottom: 20,
        width: 100,
        height: 70,
    },
})