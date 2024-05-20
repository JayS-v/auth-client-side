/*
ISC License

Permission to use, copy, modify, and distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

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