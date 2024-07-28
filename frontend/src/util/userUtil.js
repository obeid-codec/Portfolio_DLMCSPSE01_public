export const isLoggedIn = () => {
    return !!localStorage.getItem('uniconnect-auth-token');
}

export const getTokens = () => {
    return localStorage.getItem('uniconnect-auth-token');
}

