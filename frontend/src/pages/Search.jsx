import SearchForm from "../forms/SearchForm/SearchForm.jsx";
import {useQuery} from 'react-query';
import {searchHotels} from "../api-services/search.api-services.js";
import {useSearchContext} from "../contexts/SearchContext.jsx";
import {useAppContext} from "../contexts/AppContext.jsx";
import {useState, useEffect} from 'react';
import SearchResultCard from "../components/SearchResultCard.jsx";
import {hotelTypesList, facilitiesList as hotelFacilitiesList} from "../constants/hotelForm.constants.js";
import {roomFacilitiesList, roomViewsList} from '../constants/roomForm.constants.js';

export default function Search(){
    const {location, adultCount, childCount, checkInDate, checkOutDate, roomCount} = useSearchContext();
    const {showToast} = useAppContext();

    const [pageNumber, setPageNumber] = useState(1);
    const [minPricePerNight, setMinPriceNight] = useState(1);
    const [maxPricePerNight, setMaxPriceNight] = useState(4000);
    const [starRatings, setStarRatings] = useState([]);
    const [hotelTypes, setHotelTypes] = useState([]);
    const [roomViews, setRoomViews] = useState([]);
    const [hotelFacilities, setHotelFacilities] = useState([]);
    const [roomFacilities, setRoomFacilities] = useState([]);

    const query = new URLSearchParams({
        location,
        adultCount,
        childCount,
        checkInDate,
        checkOutDate,
        roomCount,
        pageNumber,
        minPricePerNight,
        maxPricePerNight,
    });
    
    starRatings.map(rating => query.append('starRatings[]', rating));
    hotelTypes.map(type => query.append('hotelTypes[]', type));
    roomViews.map(view => query.append('roomViews[]', view));
    hotelFacilities.map(facility => query.append('hotelFacilities[]', facility));
    roomFacilities.map(facility => query.append('roomFacilities[]', facility));
    
    const queryString = query.toString();
    
    const {data} = useQuery(['searchHotels', queryString], () => searchHotels(queryString), {
        onError: (error) => {
            showToast({message: error.message, success: false});
        }
    });
    
    const handlePageNumberClick = (page) => {
        setPageNumber(page);
    }

    
    const selectHandler = (event, state, setState) => {
        console.log(state.includes(event.target.value));
        if (state.includes(event.target.value)) setState(prev => prev.filter(stateVal => stateVal !== event.target.value));
        else setState(prev => [...prev, event.target.value]);
    }
    
    return(
        <div className="my-8">
            <SearchForm boxCss={'px-5 py-4'} searchBtnCss={'px-3 py-1.5'}/>
            <div className="my-16">
                <div className="flex">
                    <div className="w-1/5 mr-6">
                        <div className="border rounded-t-lg border-gray-300 px-5 py-3">
                            <p className="font-semibold">Filter by: </p>
                        </div> 
                        <div className="border-x border-gray-300 px-5 py-4">
                            <p className="font-semibold">Price Range (per night)</p>
                            <label className="">
                                <span>&#x20B9; {minPricePerNight} - &#x20B9; {maxPricePerNight}</span>
                                <div className="mt-4 relative">
                                    <p className="border border-2 rounded-xl border-blue-700"></p>
                                    <div className="flex">
                                        <p className="border rounded-3xl p-1.5 bg-red-500 absolute left-0 top-0"></p>
                                        <p className="border rounded-3xl p-1.5 bg-red-500 absolute right-0 top-0"></p>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className="border border-gray-300 pl-5 py-4">
                            <p className="font-semibold">Star Rating</p>
                            <div className="flex flex-col pt-1">
                                {
                                    Array.from({length: 5}).map((_, index) => (
                                        <label key={index+1}>
                                            <input type="checkbox" value={index+1} onChange={(event) => selectHandler(event, starRatings, setStarRatings)} checked={starRatings.includes(String(index+1))}/>
                                            <span className="pl-2">{index+1 !== 1 ? `${index+1} Stars` : '1 Star'}</span>
                                        </label>
                                    ))                                        
                                }
                                <label>
                                    <input type="checkbox" value={0} onChange={(event) => selectHandler(event, starRatings, setStarRatings)} checked={starRatings.includes('0')}/>
                                    <span className="pl-2">No Rating</span>
                                </label>
                            </div>
                        </div>
                        <div className="border-x border-gray-300 pl-5 py-4">
                            <p className="font-semibold">Hotel Type</p>
                            <div className="flex flex-col pt-1">
                                {
                                    hotelTypesList.map((type) => (
                                        <label key={type}>
                                            <input type="checkbox" value={type} onChange={(event) => selectHandler(event, hotelTypes, setHotelTypes)} checked={hotelTypes.includes(type)}/>
                                            <span className="pl-2">{type}</span>
                                        </label>
                                    ))                                        
                                }
                            </div>
                        </div>
                        <div className="border-x border-gray-300 pl-5 py-4">
                            <p className="font-semibold">Room View</p>
                            <div className="flex flex-col pt-1">
                                {
                                    roomViewsList.map((view) => (
                                        <label key={view}>
                                            <input type="checkbox" value={view} onChange={(event) => selectHandler(event, roomViews, setRoomViews)} checked={roomViews.includes(view)}/>
                                            <span className="pl-2">{view}</span>
                                        </label>
                                    ))                                        
                                }
                            </div>
                        </div>
                        <div className="border-x border-t border-gray-300 pl-5 py-4">
                            <p className="font-semibold">Hotel Facilities</p>
                            <div className="flex flex-col pt-1">
                                {
                                    hotelFacilitiesList.map((facility) => (
                                        <label key={facility}>
                                            <input type="checkbox" value={facility} onChange={(event) => selectHandler(event, hotelFacilities, setHotelFacilities)} checked={hotelFacilities.includes(facility)}/>
                                            <span className="pl-2">{facility}</span>
                                        </label>
                                    ))                                        
                                }
                            </div>
                        </div>
                        <div className="border border-gray-300 rounded-b-lg pl-6 py-4">
                            <p className="font-semibold">Room Facilities</p>
                            <div className="flex flex-col pt-1">
                                {
                                    roomFacilitiesList.map((facility) => (
                                        <label key={facility}>
                                            <input type="checkbox" value={facility} onChange={(event) => selectHandler(event, roomFacilities, setRoomFacilities)} checked={roomFacilities.includes(facility)}/>
                                            <span className="pl-2">{facility}</span>
                                        </label>
                                    ))                                        
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-4/5">
                        {
                            data && Object.keys(data).length > 0 && data.hotels.length > 0 ? (
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">{data.pagination.totalResults} hotel{data.pagination.totalResults > 1 ? 's' : ''} found {location ? `in ${location}` : ''}</h2>
                                        <div>
                                            {
                                                data.hotels.map((hotel) =>( 
                                                    <SearchResultCard hotel={hotel} key={hotel._id}/>
                                                ))
                                            }
                                        </div>
                                        <div className="text-center mt-12">
                                            {
                                                Array.from({length: parseInt(data.pagination.totalPages)}).map((_, index) => (
                                                   <span className={`border border-gray-400 px-1.5 py-0.5 mr-2 cursor-pointer ${(index+1) === pageNumber ? 'bg-slate-400 text-white' : ''}`} onClick={() => handlePageNumberClick(index+1)} key={index}>{index+1}</span> 
                                                ))
                                            }
                                        </div>
                                    </div>
                            )  
                            : <div className="text-center mt-10 mr-8">No results found</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}