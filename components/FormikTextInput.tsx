import React, { forwardRef } from "react"
import { Text, TextInput, TextInputProps, View, ViewStyle } from "react-native"

import { useField } from "formik"

type IProps = Omit<TextInputProps, "value"> & {
    name: string
    label?: string
    containerStyle?: ViewStyle
}

// Text input component for forms
const FormikTextInput = forwardRef<TextInput, IProps>(
    ({ name, label, containerStyle, ...props }, ref) => {
        const [field, meta, helpers] = useField<string>(name)

        return (
            <View style={containerStyle}>
                {label && <Text style={{ paddingBottom: 10 }}>{label}</Text>}
                <TextInput
                    value={field.value}
                    onChangeText={(text) => helpers.setValue(text)}
                    onBlur={() => helpers.setTouched(true)}
                    {...props}
                    ref={ref}
                />
                {meta.touched && meta.error && (
                    <Text style={{ margin: 10 }}>{meta.error || " "}</Text>
                )}
            </View>
        )
    },
)

export default FormikTextInput
