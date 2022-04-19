import asyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useReducer } from "react";
import { Alert } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { HttpClient } from "../common/HttpClient";
import { ErrorResponse } from "../interfaces/ErrorResponse";
import { LoginResponse } from "../interfaces/LoginResponse";
import { User } from "../models/User";
import { AuthReducer } from "./AuthReducer";

export interface AuthState {
    user?: User;
    token?: string;
    isLoged: boolean;
    errorMessage?: string;
}

interface AuthContextProps {
    state: AuthState;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

interface Props {
    children: JSX.Element | Array<JSX.Element>;
}

export const AuthProvider = ({ children }: Props) => {
    const initialState: AuthState = {
        isLoged: false,
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        HttpClient.get<LoginResponse>('auth').then(({ data }) => {
            asyncStorage.setItem('token', data.token);
            dispatch({ type: 'login', payload: { user: data.usuario, token: data.token } });
        }).catch(({ errorMessage }) => {
            dispatch({ type: 'error_on_login', payload: { errorMessage } });
        }).finally(() => {
            SplashScreen.hide();
        });
    }, []);


    const login = async (email: string, password: string) => {
        try {
            const { data } = await HttpClient.post<LoginResponse>('auth/login', { correo: email, password });
            asyncStorage.setItem('token', data.token);
            dispatch({ type: 'login', payload: { user: data.usuario, token: data.token } });
        } catch (errorResponse: any) {
            asyncStorage.removeItem('token');
            Alert.alert("Error", errorResponse.errorMessage);
            dispatch({ type: 'error_on_login', payload: { errorMessage: errorResponse.errorMessage } });
        }
    }

    const logout = () => {
        asyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    }

    return (
        <AuthContext.Provider value={{
            state: {
                user: state.user,
                token: state.token,
                isLoged: state.isLoged,
                errorMessage: state.errorMessage
            },
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}