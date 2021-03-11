/**
 * @file Profile navigator for the profile tab
 * @author PerhapsCow
 */

import {
    CardStyleInterpolators,
    StackNavigationProp,
    createStackNavigator,
} from "@react-navigation/stack"

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp } from "@react-navigation/native"
import { PostSignInBottomTabsArgs } from "./AppNavigator"
import Profile from "../screens/Profile"
import React from "react"
import { SCREEN_HEIGHT } from "../constants"
import UserSettingsScreen from "../screens/UserSettingsScreen"

export type ProfileStackArgs = {
    Profile: undefined
    UserSettings: undefined
}

// Create navigator
const ProfileStack = createStackNavigator<ProfileStackArgs>()

// Profile Navigator
const ProfileNavigator: React.FC<
    CompositeNavigationProp<
        BottomTabNavigationProp<PostSignInBottomTabsArgs, "Profile">,
        StackNavigationProp<ProfileStackArgs>
    >
> = () => (
    <ProfileStack.Navigator
        headerMode={"screen"}
        initialRouteName={"Profile"}
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
        <ProfileStack.Screen
            name={"Profile"}
            component={Profile}
            options={{
                headerShown: false,
            }}
        />
        <ProfileStack.Screen
            name={"UserSettings"}
            component={UserSettingsScreen}
            options={{
                headerTitle: "Settings",
            }}
        />
    </ProfileStack.Navigator>
)

export default ProfileNavigator
