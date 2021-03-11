/**
 * @file New comment screen, for users to create new comments.
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
    content: yup.string().required("Content is Required"),
})

const defaultValues = {
    content: "",
}

// User creates a new comment
const NewCommentScreen: React.FC<
    StackScreenProps<PostStackArgs, "NewComment">
> = ({ navigation, route }) => {
    const { instance } = useAxios()
    const { userData } = useAuthUser()
    const { styles } = useCustomTheme()

    // Upload to database via API
    const handlePressSubmit = async (values: typeof defaultValues) => {
        try {
            await instance.post(
                "/comments/",
                qs.stringify({ ...values, postID: route.params.post.postID }),
                {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                    },
                },
            )
            navigation.navigate({
                name: "PostFocus",
                params: { post: route.params.post },
            })
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
            console.log(error.message)
        }
        // Check if they have reached a comments milestone
        let badgeID = null
        try {
            const response = await instance.get(
                `/comments/all/by/${userData?.userID}`,
            )
            const numComments = response.data.comments[0].count
            switch (numComments) {
                case 10:
                    badgeID = 3
                    break
                case 100:
                    badgeID = 4
                    break
                case 1000:
                    badgeID = 5
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
                Alert.alert("New Comments Badge Awarded!")
            } catch (error) {
                Alert.alert("Something went wrong", error.message)
            }
        }
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
                                    name="content"
                                    style={styles.textArea}
                                    placeholder="Comment*"
                                    placeholderTextColor="#718093"
                                    ref={contentInput}
                                    multiline={true}
                                    numberOfLines={4}
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
                                    onPress={() => navigation.goBack()}
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

export default NewCommentScreen
