import React from 'react';
import { Text, TextStyle } from 'react-native';
import { colors } from '../../theme/Colors';

interface Props {
    children: string;
    style?: TextStyle;
    isTitle?: boolean;
}
export const BasicText = ({ children, style, isTitle }: Props) => {
    return (
        <Text style={{ fontSize: isTitle ? 30 : 16, color: colors.text, ...style }}>
            {children}
        </Text>
    );
};
