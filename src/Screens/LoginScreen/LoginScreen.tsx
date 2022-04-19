import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Keyboard, ScrollView, StatusBar, View } from 'react-native';
import { BasicButton } from '../../components/BasicButton/BasicButton';
import { BasicInput } from '../../components/BasicInput/BasicInput';
import { BasicText } from '../../components/BasicText/BasicText';
import { HyperLink } from '../../components/HyperLink/HyperLink';
import { KeyboardTypes } from '../../enums/KeyboardTypes';
import { HomeNavigatorParamList, homeNavigatorRoutes } from '../../Navigators/HomeNavigator';
import { colors } from '../../theme/Colors';
import { LoginScreenStyles } from './LoginScreenStyles';
import { AuthContext } from '../../contexts/AuthContext';
import { FormProperty } from '../../interfaces/FormProperty';
import { Anything } from '../../interfaces/Anything';
import { useForm } from '../../hooks/useForm';
const ReactWhiteLogo = require('../../assets/react-logo-white.png');

interface Props extends StackScreenProps<HomeNavigatorParamList, 'Login'> { };

export const LoginScreen = ({ navigation }: Props) => {
    const form: Anything<FormProperty> = {
        email: ['', { required: true, email: true }],
        password: [''],
    };

    const [isLoading, setisLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const { values, onChange, isFormValid, getFailedRulesInField } = useForm(form);

    const callLogin = async () => {
        Keyboard.dismiss();
        setisLoading(true);
        await login(values.email, values.password);
        setisLoading(false);
    }

    return (
        <>
            <View style={{ ...LoginScreenStyles.background }} />

            <View style={{ ...LoginScreenStyles.container }}>

                <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} contentContainerStyle={{ ...LoginScreenStyles.scrollView }}>
                    <Image style={{ ...LoginScreenStyles.logo }} source={ReactWhiteLogo} />

                    <View style={{ ...LoginScreenStyles.content }}>
                        <BasicText style={{ ...LoginScreenStyles.title }} isTitle>Iniciar Sesión</BasicText>

                        <BasicInput
                            id='email'
                            type={KeyboardTypes.email}
                            label='Email'
                            placeholder='Digite su correo electrónico'
                            value={values.email}
                            onChange={onChange}
                            getFailedRulesInField={getFailedRulesInField}
                        />

                        <BasicInput
                            id='password'
                            type={KeyboardTypes.password}
                            label='Contraseña'
                            placeholder='Digite su contraseña'
                            value={values.password}
                            onChange={onChange}
                            getFailedRulesInField={getFailedRulesInField}
                        />

                        <BasicButton style={{ marginTop: 20 }} disabled={!isFormValid} isLoading={isLoading} onPress={callLogin}>
                            Iniciar Sesión
                        </BasicButton>

                        <HyperLink style={{ ...LoginScreenStyles.hyperLink }} text='Registrarse' onPress={() => navigation.navigate(homeNavigatorRoutes.register)} />
                    </View>
                </ScrollView>
            </View >
        </>
    );
};
