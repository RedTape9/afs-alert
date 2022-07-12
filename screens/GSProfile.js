import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { WebView } from 'react-native-webview'
import { auth } from '../firebase'

const GSProfile = () => {
    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert("Wrong"))
    }

    return (
        <View style={styles.container}>
            <Image source={require('../images/logo_small.webp')} style={styles.logo} />
            <WebView source={{ uri: 'http://wws.afs.de/gsprofile2_Test_Sergej/fetchDisp.php' }} style={{ width: 300 }} />
        </View>
    )
}

export default GSProfile;

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
        marginBottom: 40,
    },
})