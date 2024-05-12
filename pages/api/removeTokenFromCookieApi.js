const removeTokenFromCookieApi = (req, res) => {
    res.setHeader('Set-Cookie', 'accesToken=; Path=/; Expires=' + new Date(0).toUTCString(), 'httpOnly');
    console.log("cookie deleted")
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Cookie deleted');
}

export default removeTokenFromCookieApi