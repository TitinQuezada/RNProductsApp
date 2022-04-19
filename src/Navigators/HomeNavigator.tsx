import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Producto } from '../models/Products';
import { HomeScreen } from '../Screens/HomeScreen/HomeScreen';
import { LoginScreen } from '../Screens/LoginScreen/LoginScreen';
import { ProductScreen } from '../Screens/ProductScreen/ProductScreen';
import { RegisterScreen } from '../Screens/RegisterScreen/RegisterScreen';

export const homeNavigatorRoutes = {
    login: 'Login' as keyof HomeNavigatorParamList,
    register: 'Register' as keyof HomeNavigatorParamList,
    home: 'Home' as keyof HomeNavigatorParamList,
    product: 'Product' as keyof HomeNavigatorParamList,
};

export type HomeNavigatorParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Product: { product: Producto };
}

export const HomeNavigator = () => {
    const Stack = createStackNavigator<HomeNavigatorParamList>();

    const { state } = useContext(AuthContext);

    return (
        <Stack.Navigator screenOptions={
            {
                headerShown: false,
                cardStyle:
                {
                    backgroundColor: 'white'
                }
            }}>

            {
                state.isLoged ? (
                    <>
                        <Stack.Screen name={homeNavigatorRoutes.home} component={HomeScreen} />
                        <Stack.Screen name={homeNavigatorRoutes.product} component={ProductScreen} />
                    </>
                ) :
                    (
                        <>
                            <Stack.Screen name={homeNavigatorRoutes.login} component={LoginScreen} />
                            <Stack.Screen name={homeNavigatorRoutes.register} component={RegisterScreen} />
                        </>
                    )
            }


        </Stack.Navigator>
    );
};
