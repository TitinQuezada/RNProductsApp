import React from 'react';
import { View } from 'react-native';

interface Props {
    size?: number;
    isVisible?: boolean;
}

export const Separator = ({ size = 10, isVisible = false }: Props) => {
    return (
        <View style={{ height: size }}>
            {isVisible && <View style={{ height: size, backgroundColor: 'white' }}></View>}
        </View>
    );
};
