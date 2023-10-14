import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/core";
import { Alert, KeyboardAvoidingView, View, Image, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { firebase } from "../firebase";

const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return pattern.test(email);
};

const getFirebaseAuthErrorMessage = (error_code) => {
    const error_messages = {
        "auth/invalid-email": "Die E-Mail-Adresse ist nicht korrekt formatiert.",
        "auth/email-already-in-use": "Die E-Mail-Adresse wird bereits verwendet.",
        "auth/operation-not-allowed": "E-Mail/Passwort-Authentifizierung nicht aktiviert.",
        "auth/weak-password": "Das Passwort ist zu schwach.",
    };
    return error_messages[error_code] || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.";
};

const SignInScreen = () => {
    const [state, setState] = useState({
        firstName: '',
        surName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    });
    const navigation = useNavigation();

    const onRegisterPress = () => {
        const { firstName, surName, email, confirmEmail, password, confirmPassword } = state;

        if (firstName === "" || surName === "") {
            Alert.alert("Vor- oder Nachname unvollständig.");
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
            return;
        }
        if (email !== confirmEmail) {
            Alert.alert("E-mail - Eingabe stimmt nicht überein.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Passworteingabe stimmt nicht überein.");
            return;
        }

        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid;
                const data = {
                    id: uid,
                    email,
                    firstName,
                    surName,
                };
                const usersRef = firebase.firestore().collection('users');
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.replace("Home", { user: data });
                    })
                    .catch((error) => {
                        Alert.alert(getFirebaseAuthErrorMessage(error.code));
                    });
            })
            .catch((error) => {
                Alert.alert(getFirebaseAuthErrorMessage(error.code));
            });
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={require('../images/logo_small.webp')} style={styles.logo} />
            <View style={styles.inputContainer}>
                <Input placeholder="Vorname" value={state.firstName} onChangeText={(text) => setState({ ...state, firstName: text })} />
                <Input placeholder="Nachname" value={state.surName} onChangeText={(text) => setState({ ...state, surName: text })} />
                <Input placeholder="E-mail" value={state.email} onChangeText={(text) => setState({ ...state, email: text })} />
                <Input placeholder="E-mail bestätigen" value={state.confirmEmail} onChangeText={(text) => setState({ ...state, confirmEmail: text })} />
                <Input placeholder="Passwort" value={state.password} onChangeText={(text) => setState({ ...state, password: text })} secureTextEntry />
                <Input placeholder="Passwort bestätigen" value={state.confirmPassword} onChangeText={(text) => setState({ ...state, confirmPassword: text })} secureTextEntry />
            </View>
            <Button title="Account erstellen" onPress={onRegisterPress} containerStyle={styles.buttonContainer} buttonStyle={styles.button} />
            <View style={styles.footerView}>
                <Button title="Schon registriert? Anmelden" onPress={() => navigation.replace("Login")} type="clear" titleStyle={styles.footerLink} />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        marginBottom: 20,
        width: 200,
        height: 140,
    },
    inputContainer: {
        width: "80%",
    },
    buttonContainer: {
        width: "60%",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#007ac5",
        borderRadius: 10,
    },
    footerView: {
        alignItems: "center",
        marginTop: 20,
    },
    footerLink: {
        color: "#007ac5",
        fontWeight: "bold",
        fontSize: 16,
    }
});