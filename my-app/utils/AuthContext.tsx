'use client';

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [islogin, setLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const login = localStorage.getItem('isLogin');
        const userInfoData = localStorage.getItem('userInfo');

        if (login) {
            setLogin(login === 'true');
        }

        if (userInfoData) {
            setUserInfo(JSON.parse(userInfoData));
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                islogin,
                setLogin,
                userInfo,
                setUserInfo
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;