import { useState } from "react"
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSaveTokenToCookie } from "../lib/saveTokenToCookie";

const server = process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL

const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [inputValues, setInputValues] = useState({
        // email: '',
        // password: ''

        email: 'test@test.com', //test
        password: 'test'         //test
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setInputValues({
            ...inputValues,
            [name]: value
        });
    }

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const userData = JSON.stringify(inputValues);

        console.log('testing, user data:', userData)
        
        try {
          const response = await fetch(`${server}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: userData
          });

          if (response.ok) {
            const { token } = await response.json()

            if(!token) {
                console.warn('No token received from the server');
                return false
            }

            await useSaveTokenToCookie(token)
            
            console.log('testing, token:', token)
            console.log('Login successful')
            router.push('/')
          } else {
            const errorData = await response.json();
            console.warn('Login failed:', errorData.message);
            setErrorMessage(errorData.message); 
          }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/68/228BE6/external-Login-web-mobile-design-and-development-smashingstocks-mixed-smashing-stocks-3.png" alt="logo" />
                Welcome to Login page
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input value={inputValues.email} onChange={handleInputChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                        <input value={inputValues.password} onChange={handleInputChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    {/* ----- 'Remember me' & 'forgot password' -------------- */}
                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div> */}
                    {/* ----- 'Remember me' & 'forgot password' -------------- */}
                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                    <button type="submit" disabled={isSubmitting} className={ `${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''} w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Sign in</button>
                    <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? 
                        
                        <Link legacyBehavior href={`/registration`}>
                            <a className="ml-4 font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                        </Link>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Login

