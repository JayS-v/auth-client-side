import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useVerifyAuthToken } from './verifyAuthToken';

export const withAuth = (WrappedComponent) => {
    const WrapperComponent = ({ token, ...props }) => {
        const [authenticationResult, setAuthenticationResult] = useState(null);
        const [userEmail, setUserEmail] = useState('');
        const router = useRouter();

        useEffect(() => {
            const fetchAuthStatus = async () => {
                const { status, userEmail } = await useVerifyAuthToken(token);
                setAuthenticationResult(status);
                setUserEmail(userEmail)
            };
    
            fetchAuthStatus();
        }, []);

        if (authenticationResult === null) {
            return <div>Loading...</div>;
        }

        if (!authenticationResult) {
            router.push('/login');
            return <div>Authentication failed. Redirecting to login page...</div>;
        }

        console.log('Access to the page authorized');

        return <WrappedComponent {...props} userEmail={userEmail}/>;
    };

    return WrapperComponent;
};
