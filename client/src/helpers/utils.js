import jwt_decode from 'jwt-decode';


export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
        if (token) {
            const username = jwt_decode(token).name;
            return username;
        } else {
            console.log('You are not logged in')
        } 
}

