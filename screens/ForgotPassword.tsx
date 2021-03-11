/**
 * @file Submit email form for when a user forgets their password
 * @author PerhapsCow
 */

import * as yup from "yup"

import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native"

import Button from "../components/Button"
import { Formik } from "formik"
import FormikTextInput from "../components/FormikTextInput"
import { PreSignInStackArgs } from "../navigators/AppNavigator"
import React from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { newPassword } from "../API/firebaseMethods"
import { useCustomTheme } from "../contexts/useCustomTheme"

// Yum email validation
const forgotPasswordValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email!")
        .required("You must input an email address!"),
})

const initialValues = {
    email: "",
}

// Form if user has forgotten their password
const ForgotPassword: React.FC<
    StackScreenProps<PreSignInStackArgs, "ForgotPassword">
> = ({ navigation }) => {
    const { styles } = useCustomTheme()
    const handlePressSubmit = async (values: typeof initialValues) => {
        console.log(values.email)
        try {
            if (await newPassword(values.email)) {
                console.log("Password reset email sent successfully")
                navigation.navigate("SignIn")
            }
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={{ paddingHorizontal: 10 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    scrollEventThrottle={16}
                    bounces={false}
                >
                    <Text style={styles.title}>Unite!</Text>
                    <Text style={styles.subtitle}>Reset Password</Text>
                    <Formik
                        validationSchema={forgotPasswordValidationSchema}
                        initialValues={initialValues}
                        onSubmit={(values) => handlePressSubmit(values)}
                    >
                        {({ handleSubmit }) => (
                            <>
                                <FormikTextInput
                                    name="email"
                                    style={styles.textInput}
                                    placeholder="Email"
                                    placeholderTextColor="#718093"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />

                                <Button label="Submit" onPress={handleSubmit} />
                            </>
                        )}
                    </Formik>
                    <Button
                        label="Back"
                        onPress={() => navigation.navigate("SignIn")}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default ForgotPassword
