const server = process.env.NEXT_PUBLIC_BACKEND_URL 

export const useVerifyAuthToken  = async (token) => {
  if(!token) {
    console.warn('failed: no token value')
    return false
  }

  try {
    const response = await fetch(`${server}/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      console.warn('invalid token, user verification failed');
      return { status: false }
    }
    
    console.log('token is valid, user verification successful')

    const responseResult = await response.json()
    const userEmail = responseResult.user && responseResult.user.email || 'no email provided';

    return { status: true, userEmail }

  } catch (error) {
    console.error('Error:', error);
    return { status: false }
  }
}