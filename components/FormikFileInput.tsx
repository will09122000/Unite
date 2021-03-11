import * as ImagePicker from "expo-image-picker"

import { Text, View, ViewStyle } from "react-native"

import { Avatar } from "react-native-elements"
import Button from "./Button"
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types"
import React from "react"
import { useField } from "formik"

type IProps = {
    name: string
    label?: string
    containerStyle?: ViewStyle
}

// File input component for image upload
const FormikFileInput: React.FC<IProps> = ({ name, label, containerStyle }) => {
    const [field, meta, helpers] = useField<ImageInfo>(name)

    // Select image from device library
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.cancelled) {
            helpers.setValue(result)
        }
    }

    return (
        <View style={containerStyle}>
            {field.value ? (
                <>
                    <Avatar
                        source={{ uri: field.value.uri }}
                        size={200}
                        rounded
                    />
                    <Button label={"Upload Image"} onPress={pickImage} />
                </>
            ) : (
                <Button label={"Upload Image"} onPress={pickImage} />
            )}
            {label && <Text style={{ paddingBottom: 10 }}>{label}</Text>}

            {meta.touched && meta.error && (
                <Text style={{ margin: 10 }}>{meta.error || " "}</Text>
            )}
        </View>
    )
}

export default FormikFileInput
