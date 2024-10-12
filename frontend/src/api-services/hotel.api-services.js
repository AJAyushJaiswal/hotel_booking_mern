
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';


const addHotel = async (hotelFormData) => {   
    const response = await fetch(`${API_BASE_URL}/api/v1/hotels/add`, {
        method: 'POST',
        credentials: 'include',
        body: hotelFormData
    });
    
    const result = await response.json();
    
    if(!result.success){
        throw new Error(result.message);
    }
    
    return result;
}

const getMyHotels = async() => {
    const response = await fetch(`${API_BASE_URL}/api/v1/hotels/`, {
        method: 'GET',
        credentials: 'include'
    });
    
    const result = await response.json();
    
    if(!result.success){
        throw new Error(result.message);
    }
    
    return result;
}


const getHotel = async (hotelId) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/hotels/${hotelId}`, {
        method: 'GET',
        credentials: 'include'
    });
    
    const result = await response.json();
    
    if(!result.success){
        throw new Error(result.message);
    }
    
    return result.data;
}


const updateHotel = async ({hotelId, hotelFormData}) => {
    console.log(hotelId);
    console.log(hotelFormData.entries());
    
    const response = await fetch(`${API_BASE_URL}/api/v1/hotels/${hotelId}`, {
        method: 'PUT',
        credentials: 'include',
        body: hotelFormData
    });
    
    const result = await response.json();
    
    if(!result.success){
        throw new Error(result.message);
    }
    
    return result;
}


const deleteHotel = async (hotelId) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/hotels/${hotelId}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    const result = await response.json();
    
    if(!result.success){
        throw new Error(result.message);
    }
    
    return result;
}


export {
    addHotel,
    getMyHotels,
    getHotel,
    updateHotel,
    deleteHotel
}