/**
 * @file Loading screen for placeholders
 * @author PerhapsCow
 */

import { ActivityIndicator, View } from "react-native"

import React from "react"
import { useCustomTheme } from "../contexts/useCustomTheme"

// Loading screen between screens if required
const LoadingScreen: React.FC = () => {
    const { styles } = useCustomTheme()

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    )
}

export default LoadingScreen
