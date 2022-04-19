import React from 'react';
import { TextInput, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    styles?: ViewStyle;
}
export const BasicSearchInput = ({ styles }: Props) => {
    return (
        <View style={{ flexDirection: 'row', height: 45, paddingHorizontal: 10, borderRadius: 30, borderWidth: 1, alignItems: 'center', justifyContent: 'space-between', ...styles }}>
            <TextInput style={{ width: '90%' }} placeholder='Buscar'></TextInput>
            <Icon name='search-outline' size={25}></Icon>
        </View>
    );
};
