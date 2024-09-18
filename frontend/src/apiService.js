
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

export {
    createUser
}