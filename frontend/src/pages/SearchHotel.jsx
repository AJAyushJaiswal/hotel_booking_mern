import {useQuery} from 'react-query';
import {getHotel} from '../api-services/search.api-services.js';
import {useAppContext} from '../contexts/AppContext.jsx';
import {useLocation, useNavigate} from 'react-router-dom';
import {useState} from 'react';

export default function SearchHotel(){
    const {state:rooms, pathname} = useLocation();
    const hotelId = pathname.split('/').at(-1);
    const {showToast} = useAppContext();
    
    const navigate = useNavigate();
    if(!rooms) navigate('../');
    
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
        <div className="flex justify-center my-12">
            <div className="w-11/12">
                <div className="flex items-center mb-4">
                    <h3 className="font-bold text-3xl mr-3">{hotel?.name}</h3>
                    <span className="flex mb-0.5">
                        {Array.from({length: parseInt(hotel?.starRating)}).map((_, index) => (
                            <svg key={index} width="22px" height="22px" className="mr-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#803aea"></path> </g></svg>
                            ))}
                    </span>
                </div>
                <div className="flex mb-1">
                    <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11.3861 1.21065C11.7472 0.929784 12.2528 0.929784 12.6139 1.21065L21.6139 8.21065C21.8575 8.4001 22 8.69141 22 9V20.5C22 21.3284 21.3284 22 20.5 22H15V14C15 13.4477 14.5523 13 14 13H10C9.44772 13 9 13.4477 9 14V22H3.5C2.67157 22 2 21.3284 2 20.5V9C2 8.69141 2.14247 8.4001 2.38606 8.21065L11.3861 1.21065Z" fill="#8636ee"></path> </g></svg>
                    <p className="ml-1.5">{hotel?.type}</p>
                </div>
                <div className="flex mb-1">
                    <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path fill="#8636ee" fillRule="evenodd" d="M893,108 C889.134158,108 886.00001,111.145455 886.00001,115.026364 C885.998199,116.705455 886.246323,117.869091 887.196257,119.395455 C888.146191,120.920909 893,128 893,128 C893,128 897.853809,120.920909 898.803743,119.395455 C899.753677,117.869091 900.001801,116.705455 899.99999,115.026364 C899.99999,111.145455 896.865842,108 893,108 L893,108 Z M893.015749,118.636364 L892.999999,118.636364 L892.984249,118.636364 C891.057501,118.636364 889.497378,117.162864 889.500003,115.131989 C889.502628,113.100239 891.067126,111.636364 892.994749,111.636364 L892.999999,111.636364 L893.006124,111.636364 C894.932871,111.636364 896.497369,113.100239 896.499994,115.131989 C896.503494,117.162864 894.942496,118.636364 893.015749,118.636364 L893.015749,118.636364 Z" transform="translate(-881 -106)"></path> </g></svg>
                    <p className="ml-0.5">{hotel?.address}, {hotel?.city}, {hotel?.country}</p>
                </div>
                <div className="flex">
                    <div className="flex items-center">
                        <svg width="13px" height="13px" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g > <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g transform="translate(-103.000000, -7321.000000)" fill="#8636ee"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M61.7302966,7173.99596 C61.2672966,7175.40296 59.4532966,7176.10496 58.1572966,7175.98796 C56.3872966,7175.82796 54.4612966,7174.88896 52.9992966,7173.85496 C50.8502966,7172.33496 48.8372966,7169.98396 47.6642966,7167.48896 C46.8352966,7165.72596 46.6492966,7163.55796 47.8822966,7161.95096 C48.3382966,7161.35696 48.8312966,7161.03996 49.5722966,7161.00296 C50.6002966,7160.95296 50.7442966,7161.54096 51.0972966,7162.45696 C51.3602966,7163.14196 51.7112966,7163.84096 51.9072966,7164.55096 C52.2742966,7165.87596 50.9912966,7165.93096 50.8292966,7167.01396 C50.7282966,7167.69696 51.5562966,7168.61296 51.9302966,7169.09996 C52.6632966,7170.05396 53.5442966,7170.87696 54.5382966,7171.50296 C55.1072966,7171.86196 56.0262966,7172.50896 56.6782966,7172.15196 C57.6822966,7171.60196 57.5872966,7169.90896 58.9912966,7170.48196 C59.7182966,7170.77796 60.4222966,7171.20496 61.1162966,7171.57896 C62.1892966,7172.15596 62.1392966,7172.75396 61.7302966,7173.99596 C61.4242966,7174.92396 62.0362966,7173.06796 61.7302966,7173.99596"> </path> </g> </g> </g> </g></svg>
                        <p className="ml-1.5">{hotel?.contactNo}</p>
                    </div>
                    <div className="flex ml-8">
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#8636ee" strokeWidth="0.00024000000000000003"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <path fillRule="evenodd" clipRule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#8636ee"></path> </g></svg>
                        <p className="ml-1">{hotel?.email}</p>
                    </div> 
                </div>
                <div className="flex rounded-xl overflow-hidden my-8" style={{height: '450px'}}>
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
                                <img src={image} alt={hotel?.name} key={image} className={`w-full pb-0.5 ${index === hotelImageNo ? 'hidden' : ''}`} style={{height: `${100/(hotel?.images?.length - 1)}%`}}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}