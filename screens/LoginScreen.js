
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, View, Image, StyleSheet } from "react-native";
import { Input, Button } from 'react-native-elements';
import { firebase } from "../firebase";

// Email Validation
const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return pattern.test(email);
};

// get Firebase Auth Error Message
const getFirebaseAuthErrorMessage = (error_code) => {
    const error_messages = {
        "auth/invalid-email": "Die E-Mail-Adresse ist nicht korrekt formatiert.",
        "auth/user-disabled": "Das Benutzerkonto wurde deaktiviert.",
        "auth/user-not-found": "Es gibt kein Benutzerkonto mit dieser E-Mail-Adresse.",
        "auth/wrong-password": "Das Passwort ist nicht korrekt.",
    };
    return error_messages[error_code] || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.";
};

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, []);

    const goToAGB = () => {
        navigation.replace("AGB");
    };

    const handleLogin = () => {
        if (!validateEmail(email)) {
            Alert.alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
            return;
        }
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Eingeloggt mit: ", user.email);
            })
            .catch((error) => Alert.alert(getFirebaseAuthErrorMessage(error.code)));
    };

    const goToResetPW = () => {
        navigation.replace("Reset");
    }

    // UI and Styling
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={require('../images/logo_small.webp')} style={styles.logo} />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="E-mail"
                    placeholderTextColor="#a9d0fc"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <Input
                    placeholder="Passwort"
                    placeholderTextColor="#a9d0fc"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={handleLogin} buttonStyle={styles.button} />
                <Button title="Registrieren" onPress={goToAGB} type="outline" buttonStyle={styles.buttonOutline} titleStyle={styles.buttonOutlineText} />
                <Button title="Passwort vergessen?" onPress={goToResetPW} type="clear" titleStyle={styles.moreText} />
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    button: {
        backgroundColor: "#007ac5",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#007ac5",
        borderWidth: 1,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "#007ac5",
        fontWeight: "700",
        fontSize: 16,
    },
    moreText: {
        color: "#007ac5",
        fontWeight: "700",
        fontSize: 16,
        marginTop: 20,
    },
});
