import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { BasicText } from '../BasicText/BasicText';

interface Props {
    text: string;
    onPress: () => void;
    style?: ViewStyle;
}
export const HyperLink = ({ text, onPress, style }: Props) => {
    return (
        <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.6}>
            <BasicText style={{ borderBottomWidth: 1, borderColor: 'white' }}>{text}</BasicText>
        </TouchableOpacity>
    );
};
