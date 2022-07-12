import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    Alert
} from "react-native";
import { firebase } from "../firebase";

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
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Eingeloggt mit: ", user.email);
            })
            .catch((error) => Alert.alert("Die eingegebenen Benutzerdaten stimmen nicht."));
    };

    const goToResetPW = () => {
        navigation.replace("Reset");
    }

    const goToGSProfile = () => {
        navigation.replace("GSP");
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={require('../images/logo_small.webp')} style={styles.logo} />

            <View style={styles.inputContainer}>

                <TextInput
                    placeholder="E-mail"
                    placeholderTextColor="#a9d0fc"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Passwort"
                    placeholderTextColor="#a9d0fc"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={goToAGB}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Registrieren</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToResetPW}>
                    <Text style={styles.moreText}>Passwort vergessen?</Text>
                </TouchableOpacity>
            </View>



        </KeyboardAvoidingView>
    )
}

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
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
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
