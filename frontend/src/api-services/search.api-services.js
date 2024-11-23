const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const searchHotels = async (location, adultCount, childCount, checkInDate, checkOutDate, roomCount, pageNumber) => {
    const query = new URLSearchParams({
        location,
        adultCount,
        childCount,
        checkInDate,
        checkOutDate,
        roomCount,
        pageNumber
    }).toString();

    const response = await fetch(`${API_BASE_URL}/api/v1/search?${query}`, {
        method: 'GET',
        credentials: 'include'
    });
    
    const result = await response.json();
    
    if(!result.success){
        throw new Error(result.message);
    }
    
    return result;
}

export {
    searchHotels
};