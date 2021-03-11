/**
 * @file Profile screen
 * @author PerhapsCow
 */

import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import React, { useCallback, useEffect, useState } from "react"

import { Avatar } from "react-native-elements"
import { FontAwesome } from "@expo/vector-icons"
import IPostData from "../types/post"
import PostSnippet from "../components/PostSnippet"
import { ProfileStackArgs } from "../navigators/ProfileNavigator"
import { StackScreenProps } from "@react-navigation/stack"
import { loggingOutAuth } from "../API/firebaseMethods"
import qs from "qs"
import { useAuthUser } from "../contexts/useAuthUser"
import { useAxios } from "../contexts/useAxios"
import { useCustomTheme } from "../contexts/useCustomTheme"

// User Profile
const Profile: React.FC<StackScreenProps<ProfileStackArgs, "Profile">> = ({
    navigation,
}) => {
    const { userData } = useAuthUser()
    const { styles } = useCustomTheme()
    const { instance } = useAxios()
    const [posts, setPosts] = useState<IPostData[]>()
    const [badges, setBadges] = useState([])
    // Loading state flag to stop the data fetch from running on leaving the screen
    const [subscribed, setSubscribed] = useState(true)

    // Pull to refresh fetches posts via API again.
    const [refreshing, setRefreshing] = useState(false)

    // Get user's posts to display at the bottom of their profile
    useEffect(() => {
        const getPosts = async () => {
            if (subscribed) {
                try {
                    const { data } = await instance.get(
                        `/posts/by/${userData?.userID}`,
                    )
                    setPosts(data.posts)
                } catch (error) {
                    //404 error needs to be removed from API
                    //Alert.alert("Something went wrong", error.message)
                }
            }
        }
        getPosts()
        return () => setSubscribed(false)
    })

    // Check if they have been at the top of the leaderboard
    useEffect(() => {
        const addLeaderboardBadge = async () => {
            if (subscribed) {
                let leaderID = null
                try {
                    const response = await instance.get("/users/")
                    // Sort users by score and only take the top user.
                    response.data.users.sort(function (
                        a: { score: number },
                        b: { score: number },
                    ) {
                        return b.score - a.score
                    })
                    leaderID = response.data.users[0].userID
                } catch (error) {
                    Alert.alert("Something went wrong", error.message)
                }
                if (leaderID == userData?.userID) {
                    try {
                        await instance.post(
                            "/badges/",
                            qs.stringify({
                                userID: userData?.userID,
                                badgeID: 9,
                            }),
                            {
                                headers: {
                                    "content-type":
                                        "application/x-www-form-urlencoded",
                                },
                            },
                        )
                    } catch (error) {
                        Alert.alert("Something went wrong", error.message)
                    }
                }
            }
        }
        addLeaderboardBadge()
    })

    // Check if they have reached a score milestone
    useEffect(() => {
        const addScoreBadges = async () => {
            if (subscribed) {
                let badgeID = null
                if (userData && userData?.score >= 100) badgeID = 6
                else if (userData && userData?.score >= 1000) badgeID = 7
                else if (userData && userData?.score >= 10000) badgeID = 8

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
                                    "content-type":
                                        "application/x-www-form-urlencoded",
                                },
                            },
                        )
                    } catch (error) {
                        Alert.alert("Something went wrong", error.message)
                    }
                }
            }
        }
        addScoreBadges()
    })

    // Get all user's badges to display
    useEffect(() => {
        const getBadges = async () => {
            if (subscribed) {
                try {
                    const { data } = await instance.get(
                        `/badges/all/${userData?.userID}`,
                    )
                    setBadges(data.badges)
                } catch (error) {
                    Alert.alert("Something went wrong", error.message)
                }
            }
        }
        getBadges()
    })

    const onRefresh = useCallback(async () => {
        setRefreshing(true)

        setRefreshing(false)
    }, [])

    // Locates a badge from the user's array of badges
    const findBadge = (badges: Record<string, unknown>[], badgeID: number) => {
        for (let i = 0; i < badges.length; i++) {
            if (badges[i].badgeID == badgeID) {
                return true
            }
        }
        return false
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
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={{ paddingVertical: "5%" }}>
                        <View style={styles.spacedRow}>
                            <TouchableOpacity
                                activeOpacity={0.2}
                                onPress={() =>
                                    navigation.navigate("UserSettings")
                                }
                                style={{
                                    alignItems: "center",
                                }}
                            >
                                <FontAwesome
                                    name="cog"
                                    style={styles.topLeftButton}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.2}
                                onPress={loggingOutAuth}
                                style={{
                                    alignItems: "center",
                                }}
                            >
                                <FontAwesome
                                    name="sign-out"
                                    style={styles.topRightButton}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: "10%" }}>
                            <Text style={styles.subtitle}>
                                {`${userData?.username}`}
                            </Text>
                            <Avatar
                                size="xlarge"
                                rounded
                                onPress={() =>
                                    console.log("Clicked Profile Picture")
                                }
                                source={
                                    userData?.profilePicture != null ||
                                    userData?.firstName == null
                                        ? require("../assets/default_profile_picture.png")
                                        : undefined
                                }
                                title={`${userData?.firstName?.substring(
                                    0,
                                    1,
                                )}${userData?.secondName?.substring(0, 1)}`}
                                activeOpacity={0.7}
                                containerStyle={styles.profilePicture}
                                overlayContainerStyle={{
                                    backgroundColor: "#383838",
                                }}
                            />
                            <Text style={styles.profileText}>
                                {userData?.firstName &&
                                    `${
                                        userData?.firstName &&
                                        userData.firstName
                                    } ${
                                        userData?.secondName &&
                                        userData.secondName
                                    }`}
                            </Text>
                            {userData?.degree && (
                                <Text style={styles.profileText}>
                                    {userData.degree}
                                </Text>
                            )}
                            {userData?.score && (
                                <Text style={styles.profileText}>
                                    {userData.score}
                                </Text>
                            )}

                            {userData?.bio && (
                                <View style={styles.bio}>
                                    <Text style={styles.bioText}>
                                        {userData.bio}
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
                                <View>
                                    <Image
                                        style={styles.badge}
                                        source={
                                            findBadge(badges, 0)
                                                ? require("../assets/badges/0.png")
                                                : require("../assets/badges/0_grey.png")
                                        }
                                    />
                                </View>
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

                            {posts &&
                                posts.map((el, index) => (
                                    <PostSnippet
                                        onPress={() =>
                                            navigation
                                                .dangerouslyGetParent()
                                                ?.navigate("Posts", {
                                                    screen: "PostFocus",
                                                    params: { post: el },
                                                })
                                        }
                                        onPressProfile={() => {
                                            return
                                        }}
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

export default Profile
