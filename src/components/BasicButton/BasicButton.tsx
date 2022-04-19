import React from 'react';
import { ActivityIndicator, TouchableOpacity, View, ViewStyle } from 'react-native';
import { BasicText } from '../BasicText/BasicText';
import { BasicButtonStyles } from './BasicButtonStyles';

interface Props {
    children: string;
    onPress: () => void;
    style?: ViewStyle;
    isLoading?: boolean;
    disabled?: boolean;
}
export const BasicButton = ({ children, onPress, style, isLoading = false, disabled = false }: Props) => {
    return (
        <TouchableOpacity disabled={isLoading || disabled} onPress={onPress} activeOpacity={0.6} >
            <View style={{ ...style, ...BasicButtonStyles.button, opacity: disabled || isLoading ? 0.6 : 1 }}>
                {
                    isLoading ? <ActivityIndicator color='white' /> : <BasicText>{children}</BasicText>
                }
            </View>
        </TouchableOpacity>
    );
};
