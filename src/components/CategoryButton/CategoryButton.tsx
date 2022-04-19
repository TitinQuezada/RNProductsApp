import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { BasicText } from '../BasicText/BasicText';
import { CategoryButtonStyles } from './CategoryButtonStyles';

interface Props {
    category: string;
    isSelected: boolean;
    onPress: () => void;
    styles?: ViewStyle;
}

export const CategoryButton = ({ category, isSelected, onPress, styles }: Props) => {
    return (
        <TouchableOpacity activeOpacity={0.4} onPress={onPress}
            style={{
                ...CategoryButtonStyles.container,
                borderColor: isSelected ? 'black' : 'rgba(0,0,0,0.6)',
                elevation: isSelected ? 8 : 0, ...styles, backgroundColor: 'white'
            }}>
            <BasicText style={{
                ...CategoryButtonStyles.text,
                fontWeight: isSelected ? 'bold' : '100',
                color: isSelected ? 'black' : 'rgba(0,0,0,0.6)'
            }}>
                {category}
            </BasicText>
        </TouchableOpacity>
    );
};
