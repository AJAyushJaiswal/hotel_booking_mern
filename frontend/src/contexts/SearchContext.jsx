import {createContext, useContext} from 'react';
import {useState} from 'react';


const SearchContext = createContext();

const SearchContextProvider = ({children}) => {
    const [location, setLocation] = useState('');
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 8640000));
    const [roomCount, setRoomCount] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    
    const saveSearchValues = (location, adultCount, childCount, checkInDate, checkOutDate, roomCount) => {
        setLocation(location);
        setAdultCount(adultCount);
        setChildCount(childCount);
        setCheckInDate(checkInDate);
        setCheckOutDate(checkOutDate);
        setRoomCount(roomCount);
        setPageNumber(pageNumber);
    }

    return(
        <SearchContext.Provider value={{location, adultCount, childCount, checkInDate, checkOutDate, roomCount, pageNumber, saveSearchValues}}>
            {children}
        </SearchContext.Provider>
    );
};

const useSearchContext = () => useContext(SearchContext);


export {
    SearchContextProvider,
    useSearchContext
};