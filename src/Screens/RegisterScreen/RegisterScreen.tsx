import React, { useContext, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Alert, Button, Image, Keyboard, ScrollView, StatusBar, Text, View } from 'react-native';
import { BasicButton } from '../../components/BasicButton/BasicButton';
import { BasicInput } from '../../components/BasicInput/BasicInput';
import { BasicText } from '../../components/BasicText/BasicText';
import { AuthContext } from '../../contexts/AuthContext';
import { KeyboardTypes } from '../../enums/KeyboardTypes';
import { useForm } from '../../hooks/useForm';
import { HomeNavigatorParamList, homeNavigatorRoutes } from '../../Navigators/HomeNavigator';
import { colors } from '../../theme/Colors';
import { LoginScreenStyles } from '../LoginScreen/LoginScreenStyles';
import { HttpClient } from '../../common/HttpClient';
import { LoginResponse } from '../../interfaces/LoginResponse';
import { ErrorResponse } from '../../interfaces/ErrorResponse';
import { Anything } from '../../interfaces/Anything';
import { FormProperty } from '../../interfaces/FormProperty';
const ReactWhiteLogo = require('../../assets/react-logo-white.png');

interface Props extends StackScreenProps<HomeNavigatorParamList, 'Register'> { };

export const RegisterScreen = ({ navigation }: Props) => {
    const form: Anything<FormProperty> = {
        name: ['', { required: true, minlength: 3 }],
        email: ['', { required: true, email: true }],
        password: ['', { required: true, minlength: 6, hasUpperCase: true, hasLowerCase: true, hasNumber: true, hasSpecialCharacter: true }],
        repeatPassword: ['', { required: true, minlength: 6, hasUpperCase: true, hasLowerCase: true, hasNumber: true, hasSpecialCharacter: true }]
    };

    const { login } = useContext(AuthContext);
    const { values, onChange, isFormValid, getFailedRulesInField } = useForm(form);
    const [isLoading, setisLoading] = useState(false);

    const register = () => {
        Keyboard.dismiss();

        if (values.password && values.repeatPassword && values.repeatPassword === values.password) {
            setisLoading(true);

            HttpClient.post<LoginResponse>('usuarios', { nombre: values.name, correo: values.email, password: values.password }).then(async () => {
                await login(values.email, values.password);
            }).catch(({ errorMessage }: ErrorResponse) => {
                Alert.alert("Error", errorMessage);
            }).finally(() => {
                setisLoading(false);
            });
        }
        else {
            Alert.alert("Error", 'las contraseñas no coinciden');
        }
    }

    return (
        <View style={{ ...LoginScreenStyles.container, backgroundColor: colors.primary }}>

            <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} contentContainerStyle={{ ...LoginScreenStyles.scrollView }}>
                <Image style={{ ...LoginScreenStyles.logo }} source={ReactWhiteLogo} />

                <View style={{ ...LoginScreenStyles.content }}>
                    <BasicText style={{ ...LoginScreenStyles.title }} isTitle>Registro</BasicText>

                    <BasicInput
                        id='name'
                        type={KeyboardTypes.email}
                        label='Nombre'
                        placeholder='Digite su correo nombre'
                        value={values.name}
                        onChange={onChange}
                        getFailedRulesInField={getFailedRulesInField}
                    />

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
                        placeholder='*******'
                        value={values.password}
                        onChange={onChange}
                        getFailedRulesInField={getFailedRulesInField}
                    />

                    <BasicInput
                        id='repeatPassword'
                        type={KeyboardTypes.password}
                        label='Confirmar contraseña'
                        placeholder='********'
                        value={values.repeatPassword}
                        onChange={onChange}
                        getFailedRulesInField={getFailedRulesInField}
                    />

                    <BasicButton disabled={!isFormValid} isLoading={isLoading} style={{ marginTop: 20, marginBottom: 10 }} onPress={register}>
                        Registrarse
                    </BasicButton>
                </View>
            </ScrollView>

            <View style={{ position: 'absolute', top: 10, left: 10 }}>
                <BasicButton onPress={() => navigation.replace(homeNavigatorRoutes.login)}>
                    Iniciar sesión
                </BasicButton>
            </View>
        </View>
    );
};
