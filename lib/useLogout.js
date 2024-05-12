import { useRouter } from 'next/router';

const useLogout = () => {
    const router = useRouter();

    const logout = async () => {
        try {
            await fetch('/api/removeTokenFromCookieApi');
            console.log('testing, token deleted')
        } catch(error) {
            console.warn(error);
        }
        console.log('Logout successful')
        router.push('/login');
    };

    return { logout };
};

export default useLogout;
