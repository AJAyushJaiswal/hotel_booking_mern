import {createContext, useContext} from 'react';


const SearchContext = createContext();

const SearchContextProvider = ({children}) => {
    const [location, setLocation] = useState('');
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    
    const saveSearchValues = (location, adultCount, childCount, checkInDate, checkOutDate) => {
        setLocation(location);
        setAdultCount(adultCount);
        setChildCount(childCount);
        setCheckInDate(checkInDate);
        setCheckOutDate(checkOutDate);
    }

    return(
        <SearchContext.Provider value={{location, adultCount, childCount, checkInDate, checkOutDate, saveSearchValues}}>
            {children}
        </SearchContext.Provider>
    );
};

const useSearchContext = () => useContext(SearchContext);


export {
    SearchContextProvider,
    useSearchContext
};