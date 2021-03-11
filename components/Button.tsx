import { Text, TouchableOpacity } from "react-native"

import React from "react"
import { useCustomTheme } from "../contexts/useCustomTheme"

interface IPrimaryButtonProps {
    label: string
    onPress: () => void
}

// Button component
const PrimaryButton: React.FC<IPrimaryButtonProps> = ({ label, onPress }) => {
    const { styles } = useCustomTheme()

    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    )
}

export default PrimaryButton
