import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/core";
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';

const AgbScreen = () => {
    const [checked, setChecked] = useState(false);
    const navigation = useNavigation();

    const handleSignUp = () => {
        if (checked) {
            navigation.replace("SignIn");
        } else {
            Alert.alert("Bitte bestätigen Sie zuerst unsere AGBs.");
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image source={require('../images/logo_small.webp')} style={styles.logo} />
            <ScrollView style={styles.agb}>
                <Text>
                    Lorem ipsum... [AGBs]
                </Text>
            </ScrollView>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    title="Ich stimme den AGBs zu"
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    containerStyle={styles.checkbox}
                    checkedColor="#007ac5"
                />
            </View>
            <Button title="Registrieren" onPress={handleSignUp} containerStyle={styles.buttonContainer} buttonStyle={styles.button} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        alignSelf: "center",
        marginTop: 40,
        marginBottom: 20,
        width: 100,
        height: 70,
    },
    agb: {
        width: "80%",
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
    },
    buttonContainer: {
        width: "60%",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#007ac5",
        borderRadius: 10,
    },
});

export default AgbScreen;