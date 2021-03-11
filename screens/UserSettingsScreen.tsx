/**
 * @file User settings screen found on the profile tab
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
    TouchableOpacity,
    View,
} from "react-native"
import defaultStyles, { altStyles } from "../styles/StyleSheet"

import { Formik } from "formik"
import FormikFileInput from "../components/FormikFileInput"
import FormikTextInput from "../components/FormikTextInput"
import { PreSignInStackArgs } from "../navigators/AppNavigator"
import React from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { useAuthUser } from "../contexts/useAuthUser"
import { useAxios } from "../contexts/useAxios"
import { useCustomTheme } from "../contexts/useCustomTheme"

// Yum username validation
const registerValidationSchema = yup.object().shape({
    username: yup.string().required("Username is Required"),
})

// User settings
const UserSettingsScreen: React.FC<
    StackScreenProps<PreSignInStackArgs, "Register">
> = ({ navigation }) => {
    const { instance } = useAxios()
    const { userData, authenticatedUser } = useAuthUser()

    const defaultValues = {
        username: userData?.username,
        firstName: userData?.firstName,
        secondName: userData?.secondName,
        degree: userData?.degree,
        bio: userData?.bio,
        profilePicture: userData?.profilePicture,
    }

    // Patch user in the database with new values
    const handlePressSubmit = async (values: typeof defaultValues) => {
        if (authenticatedUser) {
            try {
                const response = await instance.patch(
                    `/users/${authenticatedUser.uid}`,
                    values,
                )
                if (response.status === 201) {
                    console.log("Logged in successfully")
                    navigation.navigate("SignIn")
                }
            } catch (error) {
                Alert.alert("Something went wrong", error.message)
            }
        }
    }

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
                    style={{ paddingHorizontal: 10, paddingTop: 10 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    scrollEventThrottle={16}
                    bounces={false}
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
                    <Text style={styles.subtitle}>Edit Information</Text>
                    <Formik
                        validationSchema={registerValidationSchema}
                        initialValues={defaultValues}
                        onSubmit={(values) => handlePressSubmit(values)}
                    >
                        {({ handleSubmit, isValid }) => (
                            <View>
                                <FormikTextInput
                                    name="username"
                                    style={styles.textInput}
                                    placeholder="Username*"
                                    placeholderTextColor="#718093"
                                />
                                <FormikTextInput
                                    name="firstName"
                                    style={styles.textInput}
                                    placeholder="First Name"
                                    placeholderTextColor="#718093"
                                />
                                <FormikTextInput
                                    name="secondName"
                                    style={styles.textInput}
                                    placeholder="Second Name"
                                    placeholderTextColor="#718093"
                                />
                                <FormikTextInput
                                    name="degree"
                                    style={styles.textInput}
                                    placeholder="Degree"
                                    placeholderTextColor="#718093"
                                />
                                <FormikTextInput
                                    name="bio"
                                    style={styles.textInput}
                                    placeholder="Bio"
                                    placeholderTextColor="#718093"
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                <FormikFileInput
                                    containerStyle={{
                                        alignSelf: "center",
                                        marginTop: 10,
                                    }}
                                    name="profilePicture"
                                />
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handleSubmit()}
                                    disabled={!isValid}
                                >
                                    <Text style={styles.buttonText}>
                                        Update
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default UserSettingsScreen
