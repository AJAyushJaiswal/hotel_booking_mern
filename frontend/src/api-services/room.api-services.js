
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';


const addRoom = async ({hotelId, formData}) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/rooms/h/${hotelId}`, {
        method: 'POST',
        credentials: 'include',
        body: formData 
    });

    const result = await response.json();
    
    if(!result.success){
        throw new Error(result.message);
    }
    
    return result;
}


const getAllHotelRooms = async (hotelId) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/rooms/h/${hotelId}`, {
        method: 'GET',
        credentials: 'include'
    });
    
    const result = await response.json();
    
    if(!result.success){
        throw new Error(result.message);
    }
    
    return result.data;
}


export {
    addRoom,
    getAllHotelRooms
}