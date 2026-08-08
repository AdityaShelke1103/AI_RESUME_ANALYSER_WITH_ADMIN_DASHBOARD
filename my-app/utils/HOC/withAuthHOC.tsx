'use client';

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../AuthContext';

const withAuthHoc = (
    WrappedComponent: React.ComponentType<any>
) => {
    return function AuthComponent(props: any) {
        const router = useRouter();
        const { setLogin } = useContext(AuthContext);

        useEffect(() => {
            const isLogin = localStorage.getItem('isLogin');

            if (!isLogin) {
                setLogin(false);
                router.push('/');
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };
};

export default withAuthHoc;