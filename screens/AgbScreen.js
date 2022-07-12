import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Checkbox } from 'react-native-paper';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Platform,
    ScrollView,
    Alert
} from "react-native";

const AgbScreen = () => {
    const navigation = useNavigation();

    const [checked, setChecked] = React.useState(false);

    const handleSignUp = () => {
        if (checked) {
            navigation.replace("SignIn");
        }
        else {
            Alert.alert("Bitte bestätigen Sie zuerst unsere AGBs.");
        }


    };


    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image source={require('../images/logo_small.webp')} style={styles.logo} />
            <View style={styles.inputContainer}>
                <ScrollView style={{ height: 300, borderRadius: 10, }}>
                    <Text style={styles.agb}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non tellus orci ac auctor augue mauris augue neque gravida. Sit amet nulla facilisi morbi tempus. Ultricies tristique nulla aliquet enim tortor. Purus gravida quis blandit turpis cursus in hac. Pellentesque dignissim enim sit amet venenatis urna cursus. Lectus sit amet est placerat in egestas. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Id semper risus in hendrerit gravida rutrum quisque non. Neque convallis a cras semper auctor. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Senectus et netus et malesuada fames ac turpis. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin. Eleifend donec pretium vulputate sapien nec. Amet mattis vulputate enim nulla aliquet porttitor lacus. Hendrerit gravida rutrum quisque non tellus orci ac auctor augue. Sed felis eget velit aliquet sagittis id.
                    </Text>
                </ScrollView>
            </View>

            <View style={{ flexDirection: "row" }}>
                <View style={styles.checkboxContainer}>
                    <Checkbox style={styles.checkbox}
                        status={checked ? 'checked' : 'unchecked'} color={checked ? "#007ac5" : "red"}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                </View>
                <Text style={styles.label}>AGBs gelesen und einverstanden.</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Registrieren</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AgbScreen;

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
    logo: {
        alignSelf: "center",
        marginTop: 40,
        marginBottom: 20,
        width: 100,
        height: 70,

    },
    agb: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginTop: 10,
        borderWidth: 1,
        borderColor: Platform.OS === 'ios' ? "#007ac5" : 0,
        borderRadius: 3,
    },
    checkbox: {
        alignSelf: "center",

    },
    label: {
        marginTop: 20,
        marginLeft: 10,
    },
});

