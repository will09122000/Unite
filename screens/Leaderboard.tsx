/**
 * @file Leaderboard tab displaying the top 10 users
 * @author PerhapsCow
 */

import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Text,
    View,
} from "react-native"
import React, { useState } from "react"

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import LeaderboardAPI from "react-native-leaderboard"
import { PostSignInBottomTabsArgs } from "../navigators/AppNavigator"
import { useAxios } from "../contexts/useAxios"
import { useCustomTheme } from "../contexts/useCustomTheme"
import { useFocusEffect } from "@react-navigation/native"

// Leaderboard
const LeaderboardScreen: React.FC<
    BottomTabScreenProps<PostSignInBottomTabsArgs, "Leaderboard">
> = () => {
    const { styles } = useCustomTheme()

    const { instance } = useAxios()

    const [leaderboardData, setLeaderboardData] = useState()

    // When screen is focused
    useFocusEffect(() => {
        const getAllUsers = async () => {
            try {
                const { data } = await instance.get("/users/")
                // Sort users by score and only take the top 10.
                data.users.sort(function (
                    a: { score: number },
                    b: { score: number },
                ) {
                    return b.score - a.score
                })
                setLeaderboardData(data.users.slice(0, 10))
            } catch (error) {
                Alert.alert("Something went wrong", error.message)
            }
        }
        getAllUsers()
    })

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={styles.title}>Leaderboard</Text>
                    <Text style={styles.subtitle}>Top 10</Text>
                    {leaderboardData === undefined ? (
                        <ActivityIndicator />
                    ) : (
                        <LeaderboardAPI
                            data={leaderboardData}
                            sortBy="score"
                            labelBy="username"
                            icon="profilePicture"
                            rankStyle={styles.leaderboardRank}
                            labelStyle={styles.leaderboardLabel}
                            scoreStyle={styles.leaderboardScore}
                            oddRowColor={styles.container.backgroundColor}
                            evenRowColor={styles.container.backgroundColor}
                        />
                    )}
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default LeaderboardScreen
