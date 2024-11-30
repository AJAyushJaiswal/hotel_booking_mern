const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const searchHotels = async (query) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/search?${query}`, {
        method: 'GET',
        credentials: 'include'
    });
    
    const result = await response.json();
    
    if(!result.success){
        throw new Error(result.message);
    }
    
    return result.data;
}


const getHotel = async (hotelId, rooms) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/search/${hotelId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rooms)
    });

    const result = await response.json();
    
    if(!result.status){
        throw new Error(result.message);
    }
    
    return result.data;
}


export {
    searchHotels,
    getHotel
};