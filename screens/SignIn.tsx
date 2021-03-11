/**
 * @file Sign in screen, for user authentication
 * @author PerhapsCow
 */

import * as yup from "yup"

import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import React, { useRef } from "react"
import defaultStyles, { altStyles } from "../styles/StyleSheet"

import { Formik } from "formik"
import FormikTextInput from "../components/FormikTextInput"
import { PreSignInStackArgs } from "../navigators/AppNavigator"
import { StackScreenProps } from "@react-navigation/stack"
import { signInAuth } from "../API/firebaseMethods"
import { useCustomTheme } from "../contexts/useCustomTheme"

// Yum email and password validation
const signinValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid Email")
        .required("Email Address is Required"),
    password: yup
        .string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required("Password is Required"),
})

const defaultValues = { email: "", password: "" }

// User signs in
const SignInScreen: React.FC<
    StackScreenProps<PreSignInStackArgs, "SignIn">
> = ({ navigation }) => {
    const handlePressSubmit = async (values: typeof defaultValues) => {
        try {
            if (await signInAuth(values.email, values.password)) {
                console.log("Logged in successfully")
                navigation.navigate("SignIn")
            }
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
        }
    }

    // Reference to the password input field for easier navigation
    const passwordInput = useRef<TextInput>(null)

    // Colour theme switcher
    const { styles, setTheme } = useCustomTheme()
    const toggleSwitch = (value: boolean) => {
        if (!value) {
            setTheme(defaultStyles)
        } else {
            setTheme(altStyles)
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.leftRow}>
                    <Image
                        style={styles.bulb}
                        source={
                            styles === altStyles
                                ? require("../assets/lightbulb-solid-light.png")
                                : require("../assets/lightbulb-solid-dark.png")
                        }
                    />
                    <Switch
                        trackColor={{
                            false: styles.button.backgroundColor,
                            true: altStyles.button.backgroundColor,
                        }}
                        thumbColor={
                            styles === altStyles
                                ? altStyles.text.color
                                : styles.text.color
                        }
                        ios_backgroundColor={styles.button.backgroundColor}
                        onValueChange={toggleSwitch}
                        value={styles === altStyles}
                    />
                </View>
                <ScrollView
                    style={{ paddingHorizontal: 10 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    scrollEventThrottle={16}
                    bounces={false}
                >
                    <Text style={styles.title}>Unite!</Text>
                    <Text style={styles.subtitle}>Sign in</Text>
                    <Formik
                        validationSchema={signinValidationSchema}
                        initialValues={defaultValues}
                        onSubmit={(values) => handlePressSubmit(values)}
                    >
                        {({ handleSubmit, isValid }) => (
                            <>
                                <FormikTextInput
                                    name="email"
                                    style={styles.textInput}
                                    placeholder="Email"
                                    placeholderTextColor="#adadad"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    onSubmitEditing={() => {
                                        if (passwordInput.current)
                                            passwordInput.current.focus()
                                    }}
                                />
                                <FormikTextInput
                                    name="password"
                                    style={styles.textInput}
                                    placeholder="Password"
                                    placeholderTextColor="#adadad"
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    ref={passwordInput}
                                    onSubmitEditing={() => handleSubmit()}
                                />
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("ForgotPassword")
                                    }
                                >
                                    <Text style={styles.forgotPasswordText}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handleSubmit()}
                                    disabled={!isValid}
                                >
                                    <Text style={styles.buttonText}>
                                        Sign In
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() =>
                                        navigation.navigate("Register")
                                    }
                                >
                                    <Text style={styles.buttonText}>
                                        Register
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default SignInScreen
