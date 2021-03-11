/**
 * @file New post screen, for users to create new posts.
 * @author PerhapsCow
 */

import * as yup from "yup"

import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import React, { useRef } from "react"

import { Formik } from "formik"
import FormikTextInput from "../components/FormikTextInput"
import { PostStackArgs } from "../navigators/PostNavigator"
import { StackScreenProps } from "@react-navigation/stack"
import qs from "qs"
import { useAuthUser } from "../contexts/useAuthUser"
import { useAxios } from "../contexts/useAxios"
import { useCustomTheme } from "../contexts/useCustomTheme"

// Yum validation
const newPostValidationSchema = yup.object().shape({
    title: yup.string().required("A Title is Required"),
    content: yup.string().required("Content is Required"),
    score: yup.string().required("Score is Required"),
})

const defaultValues = {
    title: "",
    content: "",
    score: "",
}

// User creates a new post
const NewPostScreen: React.FC<StackScreenProps<PostStackArgs, "NewPost">> = ({
    navigation,
}) => {
    const { instance } = useAxios()
    const { userData } = useAuthUser()
    const { styles } = useCustomTheme()

    // Upload to database via API
    const handlePressSubmit = async (values: typeof defaultValues) => {
        try {
            await instance.post("/posts/", qs.stringify(values), {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            })
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
        }
        // Check if they have reached a posts milestone
        let badgeID = null
        try {
            const response = await instance.get(
                `/posts/all/${userData?.userID}`,
            )
            const numPosts = response.data.posts[0].count
            switch (numPosts) {
                case 10:
                    badgeID = 0
                    break
                case 100:
                    badgeID = 1
                    break
                case 1000:
                    badgeID = 2
                    break
            }
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
        }
        if (!(badgeID == null)) {
            try {
                await instance.post(
                    "/badges/",
                    qs.stringify({
                        userID: userData?.userID,
                        badgeID: badgeID,
                    }),
                    {
                        headers: {
                            "content-type": "application/x-www-form-urlencoded",
                        },
                    },
                )
                Alert.alert("New Posts Badge Awarded!")
            } catch (error) {
                Alert.alert("Something went wrong", error.message)
            }
        }
        navigation.navigate("Posts")
    }

    // Reference to the next text input for easier navigation
    const contentInput = useRef<TextInput>(null)

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
                    <Formik
                        validationSchema={newPostValidationSchema}
                        initialValues={defaultValues}
                        onSubmit={(values) => handlePressSubmit(values)}
                    >
                        {({ handleSubmit, isValid }) => (
                            <>
                                <FormikTextInput
                                    name="title"
                                    style={styles.textInput}
                                    placeholder="Title*"
                                    placeholderTextColor="#718093"
                                    onSubmitEditing={() => {
                                        if (contentInput.current)
                                            contentInput.current.focus()
                                    }}
                                />
                                <FormikTextInput
                                    name="content"
                                    style={styles.textArea}
                                    placeholder="Content*"
                                    placeholderTextColor="#718093"
                                    ref={contentInput}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                <FormikTextInput
                                    name="score"
                                    style={styles.textInput}
                                    placeholder="Score*"
                                    placeholderTextColor="#718093"
                                />

                                <Text style={styles.text}>Upload Photo:</Text>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handleSubmit()}
                                    disabled={!isValid}
                                >
                                    <Text style={styles.buttonText}>
                                        Publish
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => navigation.navigate("Posts")}
                                >
                                    <Text style={styles.buttonText}>
                                        Cancel
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

export default NewPostScreen
