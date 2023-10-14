import React, { useState } from 'react';
import { Alert, View, Image, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { Button, Input } from 'react-native-elements';
import { firebase } from "../firebase";

const ResetScreen = () => {
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    const onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Passwort-Reset-E-Mail wurde gesendet!");
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    const goBackToLogin = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Image source={require('../images/logo_small.webp')} style={styles.logo} />
            <Input
                placeholder="E-mail"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Button title="Passwort zurücksetzen" onPress={onResetPasswordPress} containerStyle={styles.buttonContainer} buttonStyle={styles.button} />
            <Button title="Zurück zum Login" onPress={goBackToLogin} type="clear" titleStyle={styles.footerLink} />
        </View>
    );
};

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
    buttonContainer: {
        width: "60%",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#007ac5",
        borderRadius: 10,
    },
    footerLink: {
        color: "#007ac5",
        fontWeight: "bold",
        fontSize: 16,
    }
});

export default ResetScreen;
