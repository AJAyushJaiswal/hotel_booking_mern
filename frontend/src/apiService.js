
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createUser = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    });
    
    const responseBody = await response.json();
    
    if(!responseBody.success){
        throw new Error(responseBody.message);
    }

    return responseBody;
}


const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/validate_token`, {
        method: 'GET',
        credentials: 'include'
    });
    
    const responseBody = await response.json();
    
    if(!responseBody.success){
        throw new Error("Invalid token!");
    }

    return responseBody;
}


const loginUser = async (formData) => {
    console.log(formData);
    const response = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }); 
    
    const body = await response.json();
    
    if(!body.success){
        throw new Error(body.message);
    }
    
    return body;
}


export {
    createUser,
    validateToken,
    loginUser
}