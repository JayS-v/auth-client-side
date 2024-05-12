export const useSaveTokenToCookie = async (accesTokenValue) => {

    if(!accesTokenValue) {
        console.warn('failed: no token value')
        return false
    }

    try {
        await fetch('/api/saveTokenToCookieHandler', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'accesToken': accesTokenValue })
        })

    } catch(error) {
        console.warn(error)
    }
}