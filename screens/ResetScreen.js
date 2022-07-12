import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Image,
} from "react-native";
import { firebase } from "../firebase";

const ResetScreen = () => {


    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Sie erhalten in Kürze eine E-Mail. Folgen Sie bitte den Anweisungen.");
            }, (error) => {
                Alert.alert("Die eingegebene E-Mail Adresse ist uns unbekannt. ")
            });
    }

    const goBackToLogin = () => {
        navigation.replace("Login");
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" >
            <Image source={require('../images/logo_small.webp')} style={styles.logo} />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#a9d0fc"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={onResetPasswordPress}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Passwort zurücksetzen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={goBackToLogin}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>zurück</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    );
};


export default ResetScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        marginTop: 40,
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
        borderWidth: 2,
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
    logo: {
        marginBottom: 40,
        width: 200,
        height: 140,
    },
});