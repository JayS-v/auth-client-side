import { withAuth } from '../lib/withAuth';
import MainContainer from "../components/MainContainer";
import { heading, paragraph, mark } from "../styles/text.module.css"

export async function getServerSideProps({ req }) {
    return { props: { token : req.cookies.accesToken || '' }}
}

const Index = ({ userEmail }) => {
    return (
        <MainContainer keywords={"Main page"} userEmail={userEmail}>                
            <h1 className={ heading }>Welcome to <mark className={ mark }>Main</mark> page (protected page)</h1>
            <p className={ paragraph }>Navigate to <mark className={ mark }>User</mark> page to test dynamic routing</p>
            <p className={ paragraph }>Press to <mark className={ mark }>Logout</mark> to test authentication</p>
        </MainContainer>
    );
}

export default withAuth(Index);