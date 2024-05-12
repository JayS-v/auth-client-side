const saveTokenToCookieHandler = (req, res) => {
    if (req.method === 'POST') { 
        const accesTokenValue = req.body.accesToken
        console.log(accesTokenValue)

        res.setHeader(
            "Set-Cookie",
            `accesToken=${accesTokenValue}; HttpOnly; Secure; Max-Age=${60 * 60}; SameSite=Strict; Path=/`
        )
        res.json({ succes: true })
    } else {
        res.status(405).end(); 
    }
}

export default saveTokenToCookieHandler;

//--------------------------------------------------------------------
// using 'cookie' lib (npm i cookie)
// import cookie from "cookie"   

// ...
// cookie.serialize("myFakeToken", testTokenValue, {
//     httpOnly: true, 
//     secure: true,
//     maxAge: 60 * 60,
//     sameSite: "strict",
//     path: "/", 
// })