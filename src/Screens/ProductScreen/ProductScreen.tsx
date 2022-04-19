import React from 'react'
import { View, Text, Image } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { HomeNavigatorParamList } from '../../Navigators/HomeNavigator';
import { BasicText } from '../../components/BasicText/BasicText';
import { Separator } from '../../components/Separator/Separator';
import { formatter } from '../../common/Utils';
const QuestionImage = require('../../assets/question.png');

interface Props extends StackScreenProps<HomeNavigatorParamList, 'Product'> { }

export const ProductScreen = ({ route: { params: { product } } }: Props) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: '40%' }}>
                <Image style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} source={product.img ? { uri: product.img } : QuestionImage} ></Image>
            </View>

            <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
                <BasicText style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }} >Nombre:</BasicText>
                <BasicText style={{ color: 'black' }}>{product.nombre}</BasicText>

                <Separator />

                <BasicText style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }} isTitle>Categoria:</BasicText>
                <BasicText style={{ color: 'black' }}>{product.categoria.nombre}</BasicText>

                <Separator />

                <BasicText style={{ color: 'black', fontWeight: 'bold', fontSize: 25 }} isTitle>Precio:</BasicText>
                <BasicText style={{ color: 'black' }}>{formatter(product.precio)}</BasicText>
            </View>
        </View>
    )
}
