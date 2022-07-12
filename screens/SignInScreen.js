import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/core";
import {
    KeyboardAvoidingView,
    StatusBar,
    Platform,
    StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from "../firebase";

const SignInScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [surName, setSurName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigation = useNavigation();

    const onFooterLinkPress = () => {
        navigation.replace("Login");
    }

    const onRegisterPress = () => {

        if (firstName === "" || surName === "") {
            Alert.alert("Vor- oder Nachname unvollständig.");
        }
        if (email !== confirmEmail) {
            Alert.alert("E-mail - Eingabe stimmt nicht überein.");
        }
        if (password !== confirmPassword) {
            Alert.alert("Passworteingabe stimmt nicht überein.");
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
                        alert(error);
                    });
            })
            .catch((error) => {
                Alert.alert("Eingegebene E-mail Adresse entspricht nicht der Norm.");
            });
    }

    return (


        <KeyboardAvoidingView behavior="padding" style={styles.container}>

            <View style={styles.inputContainer}>
                <Image source={require('../images/logo_small.webp')} style={styles.logo} />
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        placeholderTextColor="#a9d0fc"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#a9d0fc"
                        placeholder='E-mail wiederholen'
                        onChangeText={(text) => setConfirmEmail(text)}
                        value={confirmEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Vorname'
                        placeholderTextColor="#a9d0fc"
                        onChangeText={(text) => setFirstName(text)}
                        value={firstName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Nachname'
                        placeholderTextColor="#a9d0fc"
                        onChangeText={(text) => setSurName(text)}
                        value={surName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#a9d0fc"
                        secureTextEntry
                        placeholder='Passwort'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#a9d0fc"
                        secureTextEntry
                        placeholder='Passwort wiederholen'
                        onChangeText={(text) => setConfirmPassword(text)}
                        value={confirmPassword}
                    />
                </SafeAreaView>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Account erstellen</Text>
                </TouchableOpacity>

                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Schon registriert? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Anmelden</Text></Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',

    },
    logo: {
        width: 100,
        height: 70,
        alignSelf: "center",
        marginBottom: 30,
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    inputContainer: {
        marginTop: Platform.OS === 'android' ? (StatusBar.currentHeight + 90) : 10,
        width: "80%",
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#007ac5",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#007ac5'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
});