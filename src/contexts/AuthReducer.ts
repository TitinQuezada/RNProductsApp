import { User } from "../models/User";
import { AuthState } from "./AuthContext";

type Action =
    { type: 'login', payload: { user: User, token: string } } |
    { type: 'error_on_login', payload: { errorMessage: string } } |
    { type: 'logout' }

export const AuthReducer = (state: AuthState, action: Action): AuthState => {

    switch (action.type) {
        case 'login':

            return {
                user: action.payload.user,
                token: action.payload.token,
                isLoged: true,
                errorMessage: ''
            };

        case 'error_on_login':

            return {
                user: undefined,
                token: '',
                isLoged: false,
                errorMessage: action.payload.errorMessage
            };

        case 'logout':

            return {
                user: undefined,
                token: '',
                isLoged: false,
                errorMessage: ''
            };

        default:
            return state;
    }
}