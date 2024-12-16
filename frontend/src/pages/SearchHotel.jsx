import {useQuery} from 'react-query';
import {getHotel} from '../api-services/search.api-services.js';
import {useAppContext} from '../contexts/AppContext.jsx';
import {useLocation} from 'react-router-dom';
import {useState} from 'react';

export default function SearchHotel(){
    const {state:rooms, pathname} = useLocation();
    const hotelId = pathname.split('/').at(-1);
    const {showToast} = useAppContext();
    
    const query = new URLSearchParams();
    rooms?.map(roomId => query.append('rooms[]', roomId));
    const queryString = query.toString();
    
    const {data: hotel} = useQuery(['getHotel', getHotel], () => getHotel(hotelId, queryString), {
        onError: (error) => {
            showToast({message: error.message, status: false});
        }
    });
    
    const [hotelImageNo, setHotelImageNo] = useState(0);
    
    const handlePrevHotelImageBtn = () => {
       if(hotelImageNo > 0) setHotelImageNo(prev => prev-1); 
    }

    const handleNextHotelImageBtn = () => {
       if(hotelImageNo < hotel?.images?.length) setHotelImageNo(prev => prev+1); 
    }

    return (
        <div className="my-20">
            <div className="flex rounded-xl overflow-hidden" style={{height: '450px'}}>
                <div className="w-3/4 relative">
                    <div className="w-full flex justify-between absolute top-48">
                        <button className={`p-5 bg-slate-500 rounded-r-xl opacity-75 hover:opacity-85 active:opacity-100 ${hotelImageNo === 0 ? 'invisible' : ''}`} onClick={handlePrevHotelImageBtn}>
                            <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="14px" height="14px" viewBox="0 0 103.537 103.537" xmlSpace="preserve" stroke="#ffffff"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M103.048,12.002c-1.445-3.771-5.679-5.649-9.438-4.207L4.692,41.9c-2.753,1.055-4.603,3.662-4.688,6.609 c-0.087,2.948,1.608,5.656,4.295,6.872l88.917,40.196c0.978,0.44,2,0.65,3.006,0.65c2.784,0,5.442-1.6,6.665-4.302 c1.661-3.678,0.029-8.007-3.648-9.671L26.273,49.277l72.568-27.834C102.61,19.998,104.496,15.771,103.048,12.002z"></path> </g> </g> </g></svg>
                        </button>
                        <button className={`p-5 bg-slate-500 rounded-l-xl opacity-75 hover:opacity-85 active:opacity-100 ${hotelImageNo === hotel?.images?.length-1 ? 'invisible' : ''}`} onClick={handleNextHotelImageBtn}>
                            <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="14px" height="14px" viewBox="0 0 103.536 103.536" xmlSpace="preserve" stroke="#ffffff"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <g> <g> <path d="M0.65,91.928c1.221,2.701,3.881,4.3,6.665,4.3c1.006,0,2.029-0.209,3.006-0.65l88.917-40.195 c2.688-1.216,4.381-3.925,4.295-6.873c-0.085-2.948-1.934-5.554-4.687-6.609L9.929,7.794C6.17,6.352,1.933,8.23,0.489,12.001 c-1.447,3.769,0.438,7.995,4.207,9.44l72.569,27.834L4.299,82.255C0.62,83.92-1.012,88.249,0.65,91.928z"></path> </g> </g> </g></svg>
                        </button>
                    </div>
                    <img src={hotel?.images[hotelImageNo]} alt={hotel?.name} className="w-full h-full"/>
                </div>
                <div className="w-1/4 ml-0.5 border-box">
                    {
                        hotel?.images?.map((image, index) => (
                            <img src={image} alt={hotel?.name} key={image} className={`w-full h-1/${hotel?.images?.length-1} pb-0.5 ${index === hotelImageNo ? 'hidden' : ''}`}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}