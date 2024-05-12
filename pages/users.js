import Link from 'next/link';
import MainContainer from "../components/MainContainer";
import { withAuth } from '../lib/withAuth';
import { heading, paragraph } from "../styles/text.module.css"


// if only users fetching is required : 

// export const getStaticProps = (async (context) => {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
//     const users = await response.json()

//     return { props: { users } }
// })

export const getServerSideProps = async (context) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const users = await response.json()

    return { props: { users, token : context.req.cookies.accesToken || '' }}
}

const Users = ({ users, userEmail }) => {
    return (
        <MainContainer userEmail={userEmail}>
            <h1 className={ heading }>Users list (protected page)</h1>
            <p className={ paragraph }>Navigate to each user to test dynamic routing</p>
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 cursor-pointer">
                {users.map(user => 
                    <li key={user.id} className="pb-3 sm:pb-4">
                        <Link legacyBehavior href={`/users/${user.id}`}>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="https://img.icons8.com/deco-color/48/user-male-circle.png" alt="user image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <a className="text-sm font-medium text-gray-900 truncate dark:text-white">{user.name}</a>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</p>
                                </div>
                            </div>
                        </Link>
                    </li>  
                )}
            </ul> 
        </MainContainer>
    );
}

export default withAuth(Users);