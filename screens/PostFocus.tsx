/**
 * @file Displays a post in full along with comments.
 * @author PerhapsCow
 */

import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Share,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native"
import React, { useEffect, useState } from "react"

import { Avatar } from "react-native-elements"
import Comment from "../components/Comment"
import { FloatingAction } from "react-native-floating-action"
import { FontAwesome } from "@expo/vector-icons"
import ICommentData from "../types/comment"
import IUserData from "../types/user"
import { PostStackArgs } from "../navigators/PostNavigator"
import { StackScreenProps } from "@react-navigation/stack"
import TimeAgo from "react-native-timeago"
import { useAxios } from "../contexts/useAxios"
import { useCustomTheme } from "../contexts/useCustomTheme"

// Post focus
const PostFocus: React.FC<StackScreenProps<PostStackArgs, "PostFocus">> = ({
    navigation,
    route,
}) => {
    const { styles } = useCustomTheme()
    const { instance } = useAxios()

    const [comments, setComments] = useState<ICommentData[]>()
    const [numComments, setNumComments] = useState(0)
    const [user, setUser] = useState<IUserData[]>()

    // Loading state flag to stop the data fetch from running on leaving the screen
    const [subscribed, setSubscribed] = useState(true)

    // Get number of comments to be displayed below the comment button
    useEffect(() => {
        const getComments = async () => {
            if (subscribed) {
                try {
                    const { data } = await instance.get(
                        `/comments/${route.params.post.postID}`,
                    )
                    setComments(data.comments)
                } catch (error) {
                    // Commented out as not all posts have comments
                    //Alert.alert("Something went wrong", error.message)
                }
            }
        }
        getComments()
        return () => setSubscribed(false)
    })

    // Get number of comments to be displayed below the comments button
    useEffect(() => {
        const getNumComments = async () => {
            if (subscribed) {
                try {
                    const response = await instance.get(
                        `/comments/all/${post.postID}`,
                    )
                    setNumComments(response.data.comments[0].count)
                } catch (error) {
                    Alert.alert(
                        "Couldn't get number of comments for post " +
                            post.postID,
                        error.message,
                    )
                }
            }
        }
        getNumComments()

        return () => setSubscribed(false)
    }, [])

    // Get the user's data who made the post
    useEffect(() => {
        const getUser = async () => {
            if (subscribed) {
                try {
                    const { data } = await instance.get(
                        `/users/${route.params.post.userID}`,
                    )
                    setUser(data.users)
                } catch (error) {
                    Alert.alert("Something went wrong", error.message)
                }
            }
        }
        getUser()

        return () => setSubscribed(false)
    })

    // Share post as formatted plain text
    const onShare = async () => {
        try {
            await Share.share({
                message: `${user && user[0]?.username}'s Unite Post:\n\n${
                    post.title
                }\n${post.content}`,
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const { post } = route.params

    const actions = [
        {
            text: "New Comment",
            icon: <FontAwesome name="edit" size={20} color="#f5f6fa" />,
            name: "NewComment",
        },
        {
            text: "Share",
            icon: <FontAwesome name="share" size={20} color="#f5f6fa" />,
            name: "share",
        },
    ]

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={{
                        paddingHorizontal: 5,
                    }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    scrollEventThrottle={16}
                >
                    <View style={{ paddingVertical: 10 }}>
                        <View
                            style={{
                                ...styles.postSnippet,
                            }}
                        >
                            <View style={styles.leftRow}>
                                <Avatar
                                    rounded
                                    onPress={() =>
                                        navigation.navigate({
                                            name: "ProfileFocus",
                                            params: { userID: post.userID },
                                        })
                                    }
                                    source={
                                        user &&
                                        (user[0]?.profilePicture != null ||
                                        user[0]?.firstName == null
                                            ? require("../assets/default_profile_picture.png")
                                            : undefined)
                                    }
                                    title={
                                        user &&
                                        `${user[0]?.firstName?.substring(
                                            0,
                                            1,
                                        )}${user[0]?.secondName?.substring(
                                            0,
                                            1,
                                        )}`
                                    }
                                    activeOpacity={0.7}
                                    containerStyle={styles.profilePicture}
                                    overlayContainerStyle={{
                                        backgroundColor: "#383838",
                                    }}
                                />
                                <TouchableWithoutFeedback
                                    onPress={() =>
                                        navigation.navigate({
                                            name: "ProfileFocus",
                                            params: { userID: post.userID },
                                        })
                                    }
                                >
                                    <Text style={styles.usernamePostSnip}>
                                        {user && user[0].username}
                                    </Text>
                                </TouchableWithoutFeedback>
                                <Text style={styles.timestamp}>
                                    <TimeAgo time={post.timestamp} />
                                </Text>
                            </View>
                            <Text style={styles.postTitle}>{post.title}</Text>
                            <Text style={styles.postContent}>
                                {post.content}
                            </Text>
                        </View>
                        {comments && numComments > 1 && (
                            <Text style={styles.commentsTitle}>
                                {`${numComments} Comments`}
                            </Text>
                        )}
                        {comments && numComments < 2 && (
                            <Text style={styles.commentsTitle}>
                                {`${numComments} Comment`}
                            </Text>
                        )}
                        {comments &&
                            comments.map((el, index) => (
                                <Comment
                                    comment={el}
                                    onPressProfile={() =>
                                        navigation.navigate({
                                            name: "ProfileFocus",
                                            params: { userID: el.userID },
                                        })
                                    }
                                    key={index}
                                />
                            ))}
                    </View>
                </ScrollView>
                <FloatingAction
                    actions={actions}
                    onPressItem={(name) => {
                        if (name == "share") onShare()
                        else
                            navigation.navigate("NewComment", {
                                post,
                            })
                    }}
                    color="#F9AA33"
                    showBackground={false}
                />
            </KeyboardAvoidingView>
        </View>
    )
}

export default PostFocus
