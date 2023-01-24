import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Pressable } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';

const Authenticator = (props) => {

    const [inputValue, setInputValue] = useState('')

    //On Press Submit Button
    function onPressSubmit() {
        if (inputValue === '00000') {
            props.navigation.navigate('ListScreen')
        } else {
            alert('Invalid Authentication')
        }
    }

    //On Change input Text
    function onChangeText(text) {
        setInputValue(text)
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <Text style={styles.otpHeader}>Enter OTP to continue</Text>

                <OTPTextView
                    textInputStyle={styles.textInputStyle}
                    containerStyle={styles.containerStyle}
                    handleTextChange={onChangeText}
                    inputCount={5}
                    keyboardType="numeric"
                />

                <Pressable onPress={onPressSubmit} style={styles.submitBtn}>
                    <Text style={styles.submitText}>Submit</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}

export default Authenticator;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000'
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    otpHeader: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 10
    },
    textInputStyle: {
        color: '#fff'
    },
    containerStyle: {
        marginTop: 5
    },
    submitBtn: {
        marginTop: 25,
        backgroundColor: '#fff',
        borderRadius: 25,
        height: 50,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})