import { useRouter} from "next/router"
import MainContainer from "../../components/MainContainer";

import { heading, paragraph, mark } from "../../styles/text.module.css"

const serverExemple = 'https://jsonplaceholder.typicode.com'


export async function getServerSideProps({ params }) {
    console.log(params)

    // Fetch data from external API
    const response = await fetch(`${serverExemple}/users/${params.id}`)
    const user = await response.json()

    return { props: { user } }
}

export default function User({ user }) {
    const { query } = useRouter()

    return (
        <MainContainer keywords={user.name}>
            <div className={''}>
                <h1 className={ heading }>User with ID {query.id}</h1>
                <div className={ paragraph }>User name: <mark className={ mark }>{user.name}</mark></div>
            </div>
        </MainContainer>
    )
};