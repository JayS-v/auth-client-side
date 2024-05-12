import Anchor from "./Anchor.js";
import Head from "next/head";

import useLogout from '../lib/useLogout.js'
import { button } from '../styles/button.module.css'


const MainContainer = ({ children, keywords, userEmail }) => {
    const { logout } = useLogout();

    return (
        <>
            <Head>
                <meta keywords={keywords}></meta>
                <title>Main page</title>
            </Head>
            <nav className="border-gray-200 bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://cdn.worldvectorlogo.com/logos/logo-javascript.svg" className="h-8" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Logo</span>
                    </a>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <div className="text-sm text-gray-500 text-white hover:underline">{userEmail}</div>
                        <button 
                            className={ button }
                            type="button" 
                            onClick={logout}
                            >
                            Logout
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <nav className="bg-gray-50 bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                        <li>
                            <Anchor ariaCurrent={keywords} text={"Home"} href={"/"} />
                        </li>
                        <li>
                            <Anchor text={"Users"} href={"/users"} />
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            <main className="p-5">
                { children }
            </main>
        </>
    )
}

export default MainContainer;