/**
 * @file Registration screen, for user onboarding
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
import qs from "qs"
import { useAxios } from "../contexts/useAxios"
import { useCustomTheme } from "../contexts/useCustomTheme"

// Yum email and password validation
const registerValidationSchema = yup.object().shape({
    username: yup.string().required("Username is Required"),
    email: yup
        .string()
        .email("Please enter a valid Email")
        .required("Email Address is Required"),
    password: yup
        .string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required("Password is Required"),
    password2: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Password Confirmation is Required"),
})

const defaultValues = {
    username: "",
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    password2: "",
}

// User registers an account
const RegisterScreen: React.FC<
    StackScreenProps<PreSignInStackArgs, "Register">
> = ({ navigation }) => {
    const { instance } = useAxios()

    const handlePressSubmit = async (values: typeof defaultValues) => {
        try {
            const response = await instance.post(
                "/users/",
                qs.stringify(values),
                {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                    },
                },
            )
            if (response.status === 200) {
                Alert.alert("Please verify your email.")
                navigation.navigate("SignIn")
            }
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
        }
    }

    // References to the next text input for easier navigation
    const firstNameInput = useRef<TextInput>(null)
    const secondNameInput = useRef<TextInput>(null)
    const emailInput = useRef<TextInput>(null)
    const passwordInput = useRef<TextInput>(null)
    const password2Input = useRef<TextInput>(null)

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
                <ScrollView
                    style={{ paddingHorizontal: 10 }}
                    contentContainerStyle={{ flexGrow: 1 }}
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
                    <Text style={styles.title}>Unite!</Text>
                    <Text style={styles.subtitle}>Register</Text>
                    <Formik
                        validationSchema={registerValidationSchema}
                        initialValues={defaultValues}
                        onSubmit={(values) => handlePressSubmit(values)}
                    >
                        {({ handleSubmit, isValid }) => (
                            <>
                                <FormikTextInput
                                    name="username"
                                    style={styles.textInput}
                                    placeholder="Username*"
                                    placeholderTextColor="#718093"
                                    onSubmitEditing={() => {
                                        if (firstNameInput.current)
                                            firstNameInput.current.focus()
                                    }}
                                />
                                <FormikTextInput
                                    name="firstName"
                                    style={styles.textInput}
                                    placeholder="First Name"
                                    placeholderTextColor="#718093"
                                    ref={firstNameInput}
                                    onSubmitEditing={() => {
                                        if (secondNameInput.current)
                                            secondNameInput.current.focus()
                                    }}
                                />
                                <FormikTextInput
                                    name="secondName"
                                    style={styles.textInput}
                                    placeholder="Second Name"
                                    placeholderTextColor="#718093"
                                    ref={secondNameInput}
                                    onSubmitEditing={() => {
                                        if (emailInput.current)
                                            emailInput.current.focus()
                                    }}
                                />
                                <FormikTextInput
                                    name="email"
                                    style={styles.textInput}
                                    placeholder="Email*"
                                    placeholderTextColor="#718093"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    ref={emailInput}
                                    onSubmitEditing={() => {
                                        if (passwordInput.current)
                                            passwordInput.current.focus()
                                    }}
                                />
                                <FormikTextInput
                                    name="password"
                                    style={styles.textInput}
                                    placeholder="Password*"
                                    placeholderTextColor="#718093"
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    ref={passwordInput}
                                    onSubmitEditing={() => {
                                        if (password2Input.current)
                                            password2Input.current.focus()
                                    }}
                                />
                                <FormikTextInput
                                    name="password2"
                                    style={styles.textInput}
                                    placeholder="Retype your Password*"
                                    placeholderTextColor="#718093"
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    ref={password2Input}
                                    onSubmitEditing={() => handleSubmit()}
                                />

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handleSubmit()}
                                    disabled={!isValid}
                                >
                                    <Text style={styles.buttonText}>
                                        Submit
                                    </Text>
                                </TouchableOpacity>

                                <Text style={styles.inlineText}>
                                    Already have an account?
                                </Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() =>
                                        navigation.navigate("SignIn")
                                    }
                                >
                                    <Text style={styles.buttonText}>
                                        Sign In
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

export default RegisterScreen
