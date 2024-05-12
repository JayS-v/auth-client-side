import { useState } from "react"
import { useRouter } from 'next/router';
import Link from 'next/link';

const server = process.env.NEXT_PUBLIC_BACKEND_URL

const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inputValues, setinputValues] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true); 
  const [validPasswordLength, setValidPasswordLength] = useState(true);
  const [registrationResultMsg, setRegistrationResultMsg] = useState('')

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setinputValues({
        ...inputValues,
        [name]: value
    });
  }

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputValues.password.length < 4 || inputValues.password.length > 10) {
      setValidPasswordLength(false);
      return;
    }

    if (inputValues.password !== inputValues.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setIsSubmitting(true);

    const userData = JSON.stringify({
      email: inputValues.email,
      password: inputValues.password
    });
    
    console.log('test: user data is ', userData)

    try {
      const response = await fetch(`${server}/auth/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: userData
      });

      const { message } = await response.json()

      if (message && typeof message === 'string') {
        setRegistrationResultMsg(message)
      }
      
      if (response.ok) {
        console.log('Registration successful')
        setRegistrationResultMsg('Thank you for registering!! Redirecting to login page...')
        setTimeout(()=> router.push('/login'), 2000)
      } else {
        console.warn('Registration failed')
        const errorMessage = await response.text();
        setRegistrationResultMsg(`Registration failed: ${errorMessage}`);
      }
    } catch (error) {
        console.error('Error:', error);
        setRegistrationResultMsg('An unexpected error occurred');
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://img.icons8.com/external-ddara-lineal-ddara/64/228BE6/external-registration-medical-ddara-lineal-ddara.png" alt="logo" />
          Registration page
        </a>
        {registrationResultMsg && <p className="text-red-500 text-lg">{registrationResultMsg}</p>}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input value={inputValues.email} onChange={handleInputChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input value={inputValues.password} onChange={handleInputChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                {!validPasswordLength && <p className="text-red-500 text-sm">Password should be between 4 and 10 characters</p>}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <input 
                  value={inputValues.confirmPassword} 
                  onChange={handleInputChange} 
                  type="password" 
                  name="confirmPassword" 
                  id="confirmPassword" 
                  placeholder="••••••••" 
                  className={`bg-gray-50 border ${passwordsMatch ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} 
                  required 
                />
                {!passwordsMatch && <p className="text-red-500 text-sm">Passwords do not match</p>}
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                </div>
              </div>
              <button 
                disabled={isSubmitting}
                type="submit" 
                className={ `${isSubmitting ? 'opacity-50 cursor-not-allowed' : '' } w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>
                  Create an account
              </button>
              <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? 
                <Link legacyBehavior href={`/login`}>
                  <a className="ml-4 font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpForm;
