/**
 * @file App navigator for the main feed posts tab
 * @author PerhapsCow
 */

import {
    CardStyleInterpolators,
    StackNavigationProp,
    createStackNavigator,
} from "@react-navigation/stack"

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp } from "@react-navigation/native"
import IPostData from "../types/post"
import NewComment from "../screens/NewComment"
import NewPost from "../screens/NewPost"
import PostFocus from "../screens/PostFocus"
import { PostSignInBottomTabsArgs } from "./AppNavigator"
import Posts from "../screens/Posts"
import ProfileFocus from "../screens/ProfileFocus"
import React from "react"
import { SCREEN_HEIGHT } from "../constants"

export type PostStackArgs = {
    Posts: undefined
    PostFocus: { post: IPostData }
    NewPost: { post?: IPostData | undefined; isRequest?: boolean }
    NewComment: { post: IPostData }
    ProfileFocus: { userID: string }
}

// Create navigator
const PostStack = createStackNavigator<PostStackArgs>()

// Post Navigator
// Nested to keep new post of the bottom tab
const PostNavigator: React.FC<
    CompositeNavigationProp<
        BottomTabNavigationProp<PostSignInBottomTabsArgs, "Posts">,
        StackNavigationProp<PostStackArgs>
    >
> = () => (
    <PostStack.Navigator
        headerMode={"screen"}
        initialRouteName={"Posts"}
        screenOptions={{
            cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
            gestureEnabled: true,
            gestureDirection: "vertical",
            gestureResponseDistance: {
                vertical: SCREEN_HEIGHT / 3 + SCREEN_HEIGHT / 30,
            },
            cardOverlayEnabled: false,
            headerStyle: {
                backgroundColor: "#718093",
            },
            headerTitleStyle: { color: "#f5f6fa" },
            headerTintColor: "#f5f6fa",
        }}
    >
        <PostStack.Screen
            name={"Posts"}
            component={Posts}
            options={{ headerShown: false }}
        />
        <PostStack.Screen
            name={"NewPost"}
            component={NewPost}
            options={({ route }) => ({
                headerTitle: route.params.isRequest
                    ? "New Request"
                    : "New Post",
            })}
        />
        <PostStack.Screen
            name={"PostFocus"}
            component={PostFocus}
            options={{
                headerTitle: "",
            }}
        />
        <PostStack.Screen
            name={"NewComment"}
            component={NewComment}
            options={{
                headerTitle: "New Comment",
            }}
        />
        <PostStack.Screen
            name={"ProfileFocus"}
            component={ProfileFocus}
            options={{
                headerTitle: "",
            }}
        />
    </PostStack.Navigator>
)

export default PostNavigator
