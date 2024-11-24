import {useState, useRef, useEffect} from "react";
import {useSearchContext} from '../../contexts/SearchContext.jsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from 'react-router-dom';

export default function SearchForm({boxCss, searchBtnCss}){
    const search = useSearchContext();
    const navigate = useNavigate();

    const [location, setLocation] = useState(search.location);
    const [adultCount, setAdultCount] = useState(search.adultCount);
    const [childCount, setChildCount] = useState(search.childCount);
    const [checkInDate, setCheckInDate] = useState(search.checkInDate);
    const [checkOutDate, setCheckOutDate] = useState(search.checkOutDate);
    const [roomCount, setRoomCount] = useState(search.roomCount);
    
    const [isGuestOptionsVisibile, setIsGuestOptionsVisibile] = useState(false);
    const guestOptionsRef = useRef(null);

    const minCheckInDate = new Date();
    const maxCheckInDate = new Date();
    maxCheckInDate.setFullYear(maxCheckInDate.getFullYear() + 1);
    
    const minCheckOutDate = new Date();
    minCheckOutDate.setDate(checkInDate.getDate() + 1);
    const maxCheckOutDate = new Date();
    maxCheckOutDate.setMonth(maxCheckOutDate.getMonth() + 1);
    
    const handleLocationInput = (event) => {
        setLocation(event.target.value);
    }

    const handleCheckInDateInput = (date) => {
        setCheckInDate(new Date(date));
        setCheckOutDate(new Date(date.setDate(date.getDate() + 1)));
    }

    const handleCheckOutDateInput = (date) => {
        setCheckOutDate(new Date(date));
    }
    
    const handleGuestOptionsInsideClick = (event) => {
        setIsGuestOptionsVisibile((prev) => !prev); 
        event.stopPropagation();
    };
    
    const handleGuestOptionsOutsideClick = (event) => {
        if(guestOptionsRef.current && !guestOptionsRef.current.contains(event.target)){
            setIsGuestOptionsVisibile(false);
        }
    }
    
    useEffect(() => {
        document.addEventListener('click', handleGuestOptionsOutsideClick);
        return () => {
            document.removeEventListener('click', handleGuestOptionsOutsideClick);
        }
    }, []);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        search.saveSearchValues(location, adultCount,childCount, checkInDate, checkOutDate, roomCount);
        navigate('/search');
    }

    return(
        <form className={`rounded-3xl flex flex-row items-center md:flex-row ${boxCss}`} style={{boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'}} onSubmit={handleSubmit}>
            <label className="border-2 border-gray-300 w-96 flex flex-col m-3 rounded-lg">
                <div className="pl-3 pt-1 text-gray-600 text-sm">Location</div>
                <input type="text" className="outline-none px-3 pb-1 text-xl text-gray-700 font-semibold rounded-lg" value={location} onChange={handleLocationInput}/>
            </label>
            <div className="flex">
                <label className="border-2 border-gray-300 rounded-lg w-44 m-3 flex flex-col">
                    <div className="pl-3 pt-1 text-gray-600 text-sm">Check-in</div>
                    <DatePicker
                        selected={checkInDate} 
                        selectsStart
                        minDate={minCheckInDate}
                        maxDate={maxCheckInDate}
                        className="w-40 overflow-hidden outline-none text-gray-700 pl-3 my-1 font-semibold"  onChange={handleCheckInDateInput}
                    />
                </label>
                <label className="border-2 border-gray-300 rounded-lg w-44 m-3 flex flex-col">
                    <div className="pl-3 pt-1 text-gray-600 text-sm">Check-out</div>
                    <DatePicker
                        selected={checkOutDate} 
                        selectsEnd
                        minDate={minCheckOutDate}
                        maxDate={maxCheckOutDate}
                        className="w-40 overflow-hidden outline-none text-gray-700 pl-3 my-1 font-semibold"  onChange={handleCheckOutDateInput}
                    />
                </label>
            </div>
            <div className="relative">
                <div className="border-2 border-gray-300 rounded-lg w-96 m-3 md:w-80" onClick={handleGuestOptionsInsideClick}>
                    <div className="pl-3 pt-1 text-gray-600 text-sm">Guests & Rooms</div>
                    <div className="text-gray-700 mx-3 mb-1 mt-1 font-semibold">
                       {adultCount} {adultCount == 1 ? 'Adult' : 'Adults'}, {childCount} {childCount == 1 ? 'child' : 'children'}, {roomCount} {roomCount == 1 ? 'room' : 'rooms'}
                    </div>
                </div>
                <div className={`rounded-xl px-5 py-5 w-80 absolute -bottom-52 bg-white mx-3 z-10 md:-bottom-48 ${isGuestOptionsVisibile ? '' : 'hidden'}`} style={{boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'}} ref={guestOptionsRef} onClick={(event) => event.stopPropagation()}>
                    <div className="mb-7 flex justify-between items-center">
                        <div>
                            <span className="font-semibold text-gray-600">Rooms </span>
                            <span className="text-gray-500 text-sm">(Max 10)</span>
                        </div>
                        <div className="rounded-3xl px-3 font-semibold text-xl text-violet-600 flex items-center" style={{boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)'}}>
                            <button type="button" className="disabled:opacity-50" onClick={() => setRoomCount(prev => prev - 1)} disabled={roomCount <= 1}>-</button>
                            <span className="px-4 text-lg text-center w-12">{roomCount}</span>
                            <button type="button" className="disabled:opacity-50" onClick={() => setRoomCount(prev => prev + 1)} disabled={roomCount >= 10}>+</button>
                        </div>
                    </div>
                    <div className="mb-7 flex justify-between">
                        <div className="relative">
                            <div className="">
                                <span className="font-semibold text-gray-600">Adults </span>
                                <span className="text-gray-500 text-sm">(Max 10)</span>
                            </div>
                            <span className="text-gray-500 text-xs absolute -bottom-2">12+ years old</span>
                        </div>
                        <div className="rounded-3xl px-3 font-semibold text-xl text-violet-600 flex items-center h-7" style={{boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)'}}>
                            <button type="button" className="disabled:opacity-50" onClick={() => setAdultCount(prev => prev - 1)} disabled={adultCount <= 1}>-</button>
                            <span className="px-4 text-lg text-center w-12">{adultCount}</span>
                            <button type="button" className="disabled:opacity-50" onClick={() => setAdultCount(prev => prev + 1)} disabled={adultCount >= 10}>+</button>
                        </div>
                    </div>
                    <div className="mb-2 flex justify-between">
                        <div className="relative">
                            <div className="">
                                <span className="font-semibold text-gray-600">Children </span>
                                <span className="text-gray-500 text-sm">(Max 10)</span>
                            </div>
                            <span className="text-gray-500 text-xs absolute -bottom-2">0-12 years old</span>
                        </div>
                        <div className="rounded-3xl px-3 font-semibold text-xl text-violet-600 flex items-center h-7" style={{boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.2)'}}>
                            <button type="button" className="disabled:opacity-50" onClick={() => setChildCount(prev => prev - 1)} disabled={childCount <= 0}>-</button>
                            <span className="text-lg text-center w-12">{childCount}</span>
                            <button type="button" className="disabled:opacity-50" onClick={() => setChildCount(prev => prev + 1)} disabled={childCount >= 10}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <button type="submit" className={`border border-violet-600 bg-violet-600 text-white rounded-3xl text-xl mx-3 ${searchBtnCss}`} style={{left: '44%'}}>Search</button>
        </form>
    )
}