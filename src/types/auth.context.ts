export type TAuthLogin = (email: string, password: string) => Promise<void>;
export type TAuthLogout = () => Promise<void>;

export type TAuthUser = {
    uuid: object;
    email: string;
    lastLogin: string;
    login: string;
    name: string;
    password: string;
    patronymic: string;
    surname: string;
    telephone: string;
    resumeUrl: string | null;
    tests: number[];
};

export type TAuthState = {
    user: null | TAuthUser;
    isLoggedIn: boolean;
    isLoginPending: boolean;
    loginError: null | string;
};

export type TAuthContext = TAuthState & { login: TAuthLogin; logout: TAuthLogout };
