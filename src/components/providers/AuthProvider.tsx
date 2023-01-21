import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';

import { getApi } from 'assets/static/urls';

import { AUTH_INITIAL, AuthContext } from 'context/Auth.context';
import { TAuthContext, TAuthLogin, TAuthLogout, TAuthUser } from 'types/auth.context';

import { VSAuthUser } from '../../schemas/authUser';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
    const { children } = props;

    /// ----- STATE ----- ///
    const [authState, setAuthState] = useState(AUTH_INITIAL);
    const setLoginPending = (isLoginPending: boolean) => setAuthState((prev) => ({ ...prev, isLoginPending }));
    const setLoginError = (loginError: string) => setAuthState((prev) => ({ ...prev, loginError }));

    /// ----- AUTH-METHODS ----- ///
    const logout: TAuthLogout = useCallback(async () => setAuthState(AUTH_INITIAL), []);

    const login: TAuthLogin = useCallback(async (email, password) => {
        setLoginPending(true);
        const api = getApi('login');

        try {
            const response = await fetch(api, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!response.ok) {
                setLoginError(`Error receiving from '${api}': ${response.statusText}`);
            }

            const json = await response.json();
            const user = json.user as TAuthUser;

            if (!VSAuthUser(user)) {
                setLoginError(`Incorrect response from '${api}': ${VSAuthUser.errors}`);
                return;
            }

            setAuthState({ user, isLoginPending: false, isLoggedIn: true, loginError: '' });
        } catch (error) {
            if (error instanceof Error) {
                setLoginError(error.message);
            }
        }
    }, []);

    return (
        <AuthContext.Provider
            value={useMemo<TAuthContext>(() => ({ ...authState, login, logout }), [authState, login, logout])}
        >
            {children}
        </AuthContext.Provider>
    );
};
