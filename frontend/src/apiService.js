
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createUser = async (formData) => {
    console.log(formData);
    const response = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    });
    
    const responseBody = await response.json();
    
    if(!response.success){
         throw new Error(responseBody.message);
    }
}

export {
    createUser
}