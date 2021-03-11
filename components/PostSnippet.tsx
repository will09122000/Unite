import {
    Alert,
    Share,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native"
import React, { useState } from "react"

import { Avatar } from "react-native-elements"
import { FontAwesome } from "@expo/vector-icons"
import IPostData from "../types/post"
import IUserData from "../types/user"
import TimeAgo from "react-native-timeago"
import { useAxios } from "../contexts/useAxios"
import { useCustomTheme } from "../contexts/useCustomTheme"
import { useFocusEffect } from "@react-navigation/native"

interface IPostSnippetProps {
    post: IPostData
    onPress: () => void
    onPressProfile: () => void
}

const PostSnippet: React.FC<IPostSnippetProps> = ({
    post,
    onPress,
    onPressProfile,
}) => {
    // Cuts off content from main post feed if it is too long
    let slicedText = (post.content as string).slice(0, 255)
    if (slicedText !== post.content) slicedText += "..."

    const { styles } = useCustomTheme()

    const { instance } = useAxios()
    const [isLiked, setIsLiked] = useState(false)
    const [numLikes, setNumLikes] = useState(0)
    const [numComments, setNumComments] = useState(0)
    const [subscribed, setSubscribed] = useState(true)
    const [user, setUser] = useState<IUserData[]>()

    // Enables the user to like and unlike a post
    const like = async () => {
        try {
            const response = await instance.post(`/posts/like/${post.postID}`)
            setIsLiked(response.data.isLiked)
            isLiked ? setNumLikes(numLikes - 1) : setNumLikes(numLikes + 1)
        } catch (error) {
            Alert.alert("Could not get like ", error.message)
        }
    }

    // Detects if a post has been liked by the user
    useFocusEffect(() => {
        const getIsLiked = async () => {
            if (subscribed) {
                try {
                    const response = await instance.get(
                        `/posts/like/${post.postID}`,
                    )
                    setIsLiked(response.data.isLiked)
                } catch (error) {
                    Alert.alert(
                        "Couldn't get like for post " + post.postID,
                        error.message,
                    )
                }
            }
        }
        getIsLiked()

        return () => setSubscribed(false)
    })

    // Get number of likes to be displayed below the like button
    useFocusEffect(() => {
        const getLikes = async () => {
            if (subscribed) {
                try {
                    const response = await instance.get(
                        `/posts/like/all/${post.postID}`,
                    )
                    setNumLikes(response.data.likes[0].count)
                } catch (error) {
                    Alert.alert(
                        "Couldn't get number of likes for post " + post.postID,
                        error.message,
                    )
                }
            }
        }
        getLikes()

        return () => setSubscribed(false)
    })

    // Get number of comments to be displayed below the comment button
    useFocusEffect(() => {
        const getComments = async () => {
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
        getComments()

        return () => setSubscribed(false)
    })

    // Get the user's data who made the post
    useFocusEffect(() => {
        const getUser = async () => {
            if (subscribed) {
                try {
                    const { data } = await instance.get(`/users/${post.userID}`)
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
                message: `${user && user[0]?.username}'s Unite! Post:\n\n${
                    post.title
                }\n${post.content}`,
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <View style={styles.postSnippet}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View>
                    <View style={styles.leftRow}>
                        <Avatar
                            rounded
                            onPress={onPressProfile}
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
                                )}${user[0]?.secondName?.substring(0, 1)}`
                            }
                            activeOpacity={0.7}
                            containerStyle={styles.profilePicture}
                            overlayContainerStyle={{
                                backgroundColor: "#383838",
                            }}
                        />
                        <TouchableWithoutFeedback onPress={onPressProfile}>
                            <Text style={styles.usernamePostSnip}>
                                {user && user[0].username}
                            </Text>
                        </TouchableWithoutFeedback>
                        <Text style={styles.timestamp}>
                            <TimeAgo time={post.timestamp} />
                        </Text>
                    </View>
                    <Text style={styles.postTitle}>{post.title as string}</Text>
                    <Text style={styles.postContent}>{slicedText}</Text>
                    <View style={styles.divider} />
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.spacedRow}>
                <TouchableOpacity
                    activeOpacity={0.2}
                    style={{
                        marginBottom: "5%",
                    }}
                    onPress={like}
                >
                    <FontAwesome
                        name="thumbs-up"
                        style={
                            isLiked ? styles.likedButton : styles.unlikedButton
                        }
                    />
                    <Text style={styles.numBelowIcon}>{numLikes}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.2}
                    style={{
                        marginBottom: "5%",
                    }}
                    onPress={onPress}
                >
                    <FontAwesome name="comments" style={styles.postButton} />
                    <Text style={styles.numBelowIcon}>{numComments}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.2}
                    style={{
                        marginBottom: "5%",
                    }}
                >
                    <FontAwesome
                        name="share-square"
                        style={styles.postButton}
                        onPress={onShare}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostSnippet
