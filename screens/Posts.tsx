/**
 * @file Posts screen displaying main feed.
 * @author PerhapsCow
 */

import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    ScrollView,
    View,
} from "react-native"
import React, { useCallback, useState } from "react"

import { FloatingAction } from "react-native-floating-action"
import { FontAwesome } from "@expo/vector-icons"
import IPostData from "../types/post"
import PostSnippet from "../components/PostSnippet"
import { PostStackArgs } from "../navigators/PostNavigator"
import { SearchBar } from "react-native-elements"
import { StackScreenProps } from "@react-navigation/stack"
import { useAxios } from "../contexts/useAxios"
import { useCustomTheme } from "../contexts/useCustomTheme"
import { useFocusEffect } from "@react-navigation/native"

const actions = [
    {
        text: "New Post",
        icon: <FontAwesome name="edit" size={20} color="#f5f6fa" />,
        name: "NewPost",
    },
    {
        text: "Request Post",
        icon: <FontAwesome name="users" size={20} color="#f5f6fa" />,
        name: "RequestPost",
    },
]

// Main Feed
const Posts: React.FC<StackScreenProps<PostStackArgs, "Posts">> = ({
    navigation,
}) => {
    const { styles } = useCustomTheme()
    const { instance } = useAxios()

    // Search bar
    const [searchState, setSearchState] = useState("")
    const [loading, setLoading] = useState(false)

    // Search for posts that contain the query
    const searchFilter = async (query: string) => {
        setSearchState(query)
        setLoading(true)
        if (query) {
            try {
                const { data } = await instance.get(`/posts/search/${query}`)
                setPosts(data.posts)
            } catch (error) {
                Alert.alert("Something went wrong", error.message)
            }
        } else {
            try {
                const { data } = await instance.get("/posts/")
                setPosts(data.posts)
            } catch (error) {
                Alert.alert("Something went wrong", error.message)
            }
        }
        setLoading(false)
    }

    // Pull to refresh fetches posts via API again.
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        try {
            const { data } = await instance.get("/posts/")
            setPosts(data.posts)
        } catch (error) {
            Alert.alert("Something went wrong", error.message)
        }
        setRefreshing(false)
    }, [])

    const [posts, setPosts] = useState<IPostData[]>()

    // Loading state flag to stop the data fetch from running on leaving the screen
    const [subscribed, setSubscribed] = useState(true)

    useFocusEffect(() => {
        const getPosts = async () => {
            if (subscribed) {
                try {
                    const { data } = await instance.get("/posts/")
                    setPosts(data.posts)
                } catch (error) {
                    Alert.alert("Something went wrong", error.message)
                }
            }
        }

        getPosts()
        return () => setSubscribed(false)
    })

    if (posts === undefined) {
        return <ActivityIndicator style={styles.container} />
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
                    <SearchBar
                        placeholder="Search"
                        value={searchState}
                        onChangeText={(query) => searchFilter(query)}
                        round
                        showLoading={loading}
                        searchIcon={{ color: "#f5f6fa", size: 26 }}
                        clearIcon={{ color: "#f5f6fa", size: 26 }}
                        onClear={onRefresh}
                        inputStyle={{
                            color: "#f5f6fa",
                            backgroundColor: "#718093",
                        }}
                        containerStyle={{
                            backgroundColor: "#718093",
                            borderRadius: 10,
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                            margin: "1%",
                            marginBottom: "5%",
                        }}
                        inputContainerStyle={{ backgroundColor: "#718093" }}
                    />
                    {posts &&
                        posts.map((el, index) => (
                            <PostSnippet
                                onPress={() =>
                                    navigation.navigate({
                                        name: "PostFocus",
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
                </ScrollView>
                <FloatingAction
                    actions={actions}
                    onPressItem={(name) => {
                        navigation.navigate({
                            name: "NewPost",
                            params: {
                                isRequest: name === "RequestPost",
                            },
                        })
                    }}
                    color="#F9AA33"
                    showBackground={false}
                />
            </KeyboardAvoidingView>
        </View>
    )
}

export default Posts
