import React from 'react';
import { View, Image, ViewStyle, TouchableOpacity } from 'react-native';
import { formatter } from '../../common/Utils';
import { Producto } from '../../models/Products';
import { BasicText } from '../BasicText/BasicText';
import { colors } from '../../theme/Colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeNavigatorParamList } from '../../Navigators/HomeNavigator';
const QuestionImage = require('../../assets/question.png');

interface Props {
    product: Producto;
    styles?: ViewStyle;
}

export const ProductCard = ({ styles, product, product: { _id: id, nombre: name, categoria: { nombre: categoryName }, precio: price, img } }: Props) => {
    const navigation = useNavigation<NavigationProp<HomeNavigatorParamList>>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Product', { product })} activeOpacity={0.6} style={{ flexDirection: 'row', borderRadius: 25, overflow: 'hidden', elevation: 5, height: 80, ...styles }}>
            <View style={{ width: '40%', backgroundColor: 'white' }}>
                <Image style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} source={img ? { uri: img } : QuestionImage} />
            </View>

            <View style={{ paddingHorizontal: 5, backgroundColor: colors.primary, justifyContent: 'center', width: '60%', height: '100%' }}>
                <BasicText style={{ fontSize: 14, textAlign: 'center' }}>{name}</BasicText>
                <BasicText style={{ fontWeight: 'bold', textAlign: 'center' }}>{formatter(price)}</BasicText>
            </View>
        </TouchableOpacity>
    );
};
