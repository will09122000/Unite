import {
    Alert,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native"
import React, { useEffect, useState } from "react"

import { Avatar } from "react-native-elements"
import ICommentData from "../types/comment"
import IUserData from "../types/user"
import TimeAgo from "react-native-timeago"
import { useAxios } from "../contexts/useAxios"
import { useCustomTheme } from "../contexts/useCustomTheme"

interface ICommentProps {
    comment: ICommentData
    onPressProfile: () => void
}

// Comment component used in the post focus screen
const Comment: React.FC<ICommentProps> = ({ comment, onPressProfile }) => {
    const { styles } = useCustomTheme()

    const { instance } = useAxios()
    const [user, setUser] = useState<IUserData[]>()

    // Loading state flag to stop the data fetch from running on leaving the screen
    const [subscribed, setSubscribed] = useState(true)

    // Get the user's data who made the comment
    useEffect(() => {
        const getUser = async () => {
            if (subscribed) {
                try {
                    const { data } = await instance.get(
                        `/users/${comment.userID}`,
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

    return (
        <View style={styles.comment}>
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
                    overlayContainerStyle={{ backgroundColor: "#383838" }}
                />
                <TouchableWithoutFeedback onPress={onPressProfile}>
                    <Text style={styles.usernamePostSnip}>
                        {user && user[0].username}
                    </Text>
                </TouchableWithoutFeedback>
                <Text style={styles.timestamp}>
                    <TimeAgo time={comment.timestamp} />
                </Text>
            </View>
            <Text style={styles.postContent}>{comment.content}</Text>
        </View>
    )
}

export default Comment
