import { TAuthContext, TAuthState } from 'types/auth.context';
import { createContext } from 'react';

export const AUTH_INITIAL: TAuthState = {
    user: null,
    isLoggedIn: false,
    isLoginPending: false,
    loginError: null
};
export const AuthContext = createContext<TAuthContext | null>(null);
