/**
 * @file Profile focus screen
 * @author PerhapsCow
 */

import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native"
import React, { useEffect, useState } from "react"

import { Avatar } from "react-native-elements"
import IPostData from "../types/post"
import IUserData from "../types/user"
import PostSnippet from "../components/PostSnippet"
import { PostStackArgs } from "../navigators/PostNavigator"
import { StackScreenProps } from "@react-navigation/stack"
import { useAxios } from "../contexts/useAxios"
import { useCustomTheme } from "../contexts/useCustomTheme"

const ProfileFocus: React.FC<
    StackScreenProps<PostStackArgs, "ProfileFocus">
> = ({ navigation, route }) => {
    const { styles } = useCustomTheme()
    const { instance } = useAxios()
    const [user, setUser] = useState<IUserData[]>()
    const [posts, setPosts] = useState<IPostData[]>()
    const [badges, setBadges] = useState([])
    // Loading state flag to stop the data fetch from running on leaving the screen
    const [subscribed, setSubscribed] = useState(true)

    // Get the user's data to be displayed
    useEffect(() => {
        const getUser = async () => {
            if (subscribed) {
                try {
                    const { data } = await instance.get(
                        `/users/${route.params.userID}`,
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

    // Get user's posts to display at the bottom of their profile
    useEffect(() => {
        const getPosts = async () => {
            if (subscribed) {
                try {
                    const { data } = await instance.get(
                        `/posts/by/${route.params.userID}`,
                    )
                    setPosts(data.posts)
                } catch (error) {
                    Alert.alert("Something went wrong", error.message)
                }
            }
        }
        getPosts()
        return () => setSubscribed(false)
    })

    // Get all user's badges to display
    useEffect(() => {
        const getBadges = async () => {
            if (subscribed) {
                try {
                    const { data } = await instance.get(
                        `/badges/all/${route.params.userID}`,
                    )
                    setBadges(data.badges)
                } catch (error) {
                    Alert.alert("Something went wrong", error.message)
                }
            }
        }
        getBadges()
        return () => setSubscribed(false)
    })

    // Locates a badge from the user's array of badges
    const findBadge = (badges: Record<string, unknown>[], badgeID: number) => {
        for (let i = 0; i < badges.length; i++) {
            if (badges[i].badgeID == badgeID) {
                return true
            }
        }
        return false
    }

    if (posts === undefined) {
        return <ActivityIndicator />
    }

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
                    bounces={false}
                >
                    <View style={{ paddingVertical: "5%" }}>
                        <View style={{ marginTop: "10%" }}>
                            <Text style={styles.subtitle}>
                                {user && `${user[0]?.username}`}
                            </Text>
                            <Avatar
                                size="xlarge"
                                rounded
                                onPress={() =>
                                    console.log("Clicked Profile Picture")
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
                                    )}${user[0]?.secondName?.substring(0, 1)}`
                                }
                                activeOpacity={0.7}
                                containerStyle={styles.profilePicture}
                                overlayContainerStyle={{
                                    backgroundColor: "#383838",
                                }}
                            />
                            <Text style={styles.profileText}>
                                {user &&
                                    user[0]?.firstName &&
                                    `${
                                        user[0]?.firstName && user[0].firstName
                                    } ${
                                        user[0]?.secondName &&
                                        user[0].secondName
                                    }`}
                            </Text>
                            {user && user[0]?.degree && (
                                <Text style={styles.profileText}>
                                    {user && user[0].degree}
                                </Text>
                            )}
                            {user && user[0]?.score && (
                                <Text style={styles.profileText}>
                                    {user[0].score}
                                </Text>
                            )}

                            {user && user[0]?.bio && (
                                <View style={styles.bio}>
                                    <Text style={styles.bioText}>
                                        {user[0].bio}
                                    </Text>
                                </View>
                            )}

                            <Text
                                style={{ ...styles.subtitle, marginTop: "15%" }}
                            >
                                Badges
                            </Text>
                            <Text
                                style={{
                                    ...styles.profileText,
                                    marginBottom: "5%",
                                }}
                            >
                                Posts
                            </Text>
                            <View style={styles.spacedRow}>
                                <Image
                                    style={styles.badge}
                                    source={
                                        findBadge(badges, 0)
                                            ? require("../assets/badges/0.png")
                                            : require("../assets/badges/0_grey.png")
                                    }
                                />
                                <Image
                                    style={styles.badge}
                                    source={
                                        findBadge(badges, 1)
                                            ? require("../assets/badges/1.png")
                                            : require("../assets/badges/1_grey.png")
                                    }
                                />
                                <Image
                                    style={styles.badge}
                                    source={
                                        findBadge(badges, 2)
                                            ? require("../assets/badges/2.png")
                                            : require("../assets/badges/2_grey.png")
                                    }
                                />
                            </View>
                            <View
                                style={{ ...styles.divider, marginTop: "5%" }}
                            ></View>
                            <Text
                                style={{
                                    ...styles.profileText,
                                    marginBottom: "5%",
                                }}
                            >
                                Comments
                            </Text>
                            <View style={styles.spacedRow}>
                                <Image
                                    style={styles.badge}
                                    source={
                                        findBadge(badges, 3)
                                            ? require("../assets/badges/3.png")
                                            : require("../assets/badges/3_grey.png")
                                    }
                                />
                                <Image
                                    style={styles.badge}
                                    source={
                                        findBadge(badges, 4)
                                            ? require("../assets/badges/4.png")
                                            : require("../assets/badges/4_grey.png")
                                    }
                                />
                                <Image
                                    style={styles.badge}
                                    source={
                                        findBadge(badges, 5)
                                            ? require("../assets/badges/5.png")
                                            : require("../assets/badges/5_grey.png")
                                    }
                                />
                            </View>
                            <View
                                style={{ ...styles.divider, marginTop: "5%" }}
                            ></View>
                            <Text
                                style={{
                                    ...styles.profileText,
                                    marginBottom: "5%",
                                }}
                            >
                                Score
                            </Text>
                            <View style={styles.spacedRow}>
                                <Image
                                    style={styles.badge}
                                    source={
                                        findBadge(badges, 6)
                                            ? require("../assets/badges/6.png")
                                            : require("../assets/badges/6_grey.png")
                                    }
                                />
                                <Image
                                    style={styles.badge}
                                    source={
                                        findBadge(badges, 7)
                                            ? require("../assets/badges/7.png")
                                            : require("../assets/badges/7_grey.png")
                                    }
                                />
                                <Image
                                    style={styles.badge}
                                    source={
                                        findBadge(badges, 8)
                                            ? require("../assets/badges/8.png")
                                            : require("../assets/badges/8_grey.png")
                                    }
                                />
                            </View>
                            <View
                                style={{ ...styles.divider, marginTop: "5%" }}
                            ></View>
                            <Text
                                style={{
                                    ...styles.profileText,
                                    marginBottom: "5%",
                                }}
                            >
                                Leaderboard Topper
                            </Text>
                            <Image
                                style={{ ...styles.badge, alignSelf: "center" }}
                                source={
                                    findBadge(badges, 9)
                                        ? require("../assets/badges/9.png")
                                        : require("../assets/badges/9_grey.png")
                                }
                            />

                            <Text
                                style={{ ...styles.subtitle, marginTop: "15%" }}
                            >
                                Past Activity
                            </Text>

                            {posts.map((el, index) => (
                                <PostSnippet
                                    onPress={() =>
                                        navigation
                                            .dangerouslyGetParent()
                                            ?.navigate("Posts", {
                                                screen: "PostFocus",
                                                params: { post: el },
                                            })
                                    }
                                    onPressProfile={() =>
                                        navigation.navigate({
                                            name: "ProfileFocus",
                                            params: { userID: el.userID },
                                        })
                                    }
                                    post={el}
                                    key={index}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default ProfileFocus
