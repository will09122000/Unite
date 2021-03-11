/**
 * @file Main navigator for the app
 * @author PerhapsCow
 */

import { SafeAreaView, StatusBar } from "react-native"

import { FontAwesome } from "@expo/vector-icons"
import ForgotPassword from "../screens/ForgotPassword"
import IPostData from "../types/post"
import Leaderboard from "../screens/Leaderboard"
import LoadingScreen from "../screens/LoadingScreen"
import { NavigationContainer } from "@react-navigation/native"
import PostNavigator from "./PostNavigator"
import ProfileNavigator from "./ProfileNavigator"
import React from "react"
import RegisterScreen from "../screens/RegisterFirst"
import { SCREEN_HEIGHT } from "../constants"
import SignIn from "../screens/SignIn"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { useAuthUser } from "../contexts/useAuthUser"
import { useCustomTheme } from "../contexts/useCustomTheme"

// Route arguments
export type PreSignInStackArgs = {
    SignIn: undefined
    Register: undefined
    ForgotPassword: undefined
}

// Screens that can be accessed while signed in
export type PostSignInBottomTabsArgs = {
    Profile: undefined
    Posts: { screen: string; params?: { post: IPostData } }
    Leaderboard: undefined
}

// Create navigators
const PreSignInStack = createStackNavigator<PreSignInStackArgs>()
const PostSignInBottomTabs = createBottomTabNavigator<PostSignInBottomTabsArgs>()

// App Navigator
const AppNavigator: React.FC = () => {
    const { authenticatedUser } = useAuthUser()
    const { styles } = useCustomTheme()

    // If loading auth context user state, render a loading screen
    if (authenticatedUser === undefined) {
        return <LoadingScreen />
    }

    // Switch between a stack containing register flow, and main app
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={"#3096f3"} />
            <SafeAreaView style={styles.container}>
                {authenticatedUser ? (
                    <PostSignInBottomTabs.Navigator
                        initialRouteName="Posts"
                        sceneContainerStyle={{
                            ...styles.container,
                            paddingTop: SCREEN_HEIGHT / 200,
                        }}
                        tabBarOptions={{
                            activeTintColor: "#f5f6fa",
                            inactiveTintColor: "#f5f6fa",
                            activeBackgroundColor: "#383838",
                            inactiveBackgroundColor: "#080808",
                            showLabel: false,
                        }}
                    >
                        <PostSignInBottomTabs.Screen
                            name="Posts"
                            component={PostNavigator}
                            options={{
                                tabBarIcon: ({ color, size }) => (
                                    <FontAwesome
                                        name="home"
                                        color={color}
                                        size={size}
                                    />
                                ),
                            }}
                        />
                        <PostSignInBottomTabs.Screen
                            name="Leaderboard"
                            component={Leaderboard}
                            options={{
                                tabBarIcon: ({ color, size }) => (
                                    <FontAwesome
                                        name="list-ol"
                                        color={color}
                                        size={size}
                                    />
                                ),
                            }}
                        />
                        <PostSignInBottomTabs.Screen
                            name="Profile"
                            component={ProfileNavigator}
                            options={{
                                tabBarIcon: ({ color, size }) => (
                                    <FontAwesome
                                        name="user"
                                        color={color}
                                        size={size}
                                    />
                                ),
                            }}
                        />
                    </PostSignInBottomTabs.Navigator>
                ) : (
                    <PreSignInStack.Navigator
                        headerMode={"none"}
                        initialRouteName="SignIn"
                    >
                        <PreSignInStack.Screen
                            name="SignIn"
                            component={SignIn}
                        />
                        <PreSignInStack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                        <PreSignInStack.Screen
                            name="ForgotPassword"
                            component={ForgotPassword}
                        />
                    </PreSignInStack.Navigator>
                )}
            </SafeAreaView>
            <SafeAreaView style={styles.backgroundBottom} />
        </NavigationContainer>
    )
}

export default AppNavigator
