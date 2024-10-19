import {useQuery} from 'react-query';
import {getAllHotelRooms} from '../api-services/room.api-services.js';
import {useParams, Link} from 'react-router-dom';
import {useAppContext} from '../contexts/AppContext.jsx';


export default function HotelRooms(){
    const {hotelId} = useParams();
    const {showToast} = useAppContext();

    const {data:rooms} = useQuery('fetchAllHotelRooms', () => getAllHotelRooms(hotelId), {
        onError: async (error) => {
            showToast({message: error.message, success: false});
        }
    });

    return (
        <div className="">
            <div className="">
                <h1 className="font-medium text-lg">hotel Name</h1>
            </div>
        {rooms ? 
            <div>
                {rooms.map((room, index) => (
                    <div key={index} className="border rounded-md px-16 py-5 my-8 w-2/3 mx-auto">
                        <div className="flex justify-between items-center mb-3">
                            <div className="">
                                <p className="text-lg font-medium leading-none">{room.name}</p> 
                                <p className="text-sm leading-none">{room.type}</p>
                            </div>
                            <div className="flex">
                                {/* View Full Details Button */}
                                <div className="relative mr-1.5 group h-min">
                                    <Link to={`./${room._id}`}>
                                        <svg fill="#8a3aee" width={23} height={23} viewBox="0 0 36.00 36.00" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" stroke="#8a3aee" strokeWidth="0.00036">
                                            <g strokeWidth="0"/>
                                            <g strokeLinecap="round" strokeLinejoin="round"/>
                                            <g><path d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6Zm0,22H4V8H32Z"/>
                                            <path d="M9,14H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"/>
                                            <path d="M9,18H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"/>
                                            <path d="M9,22H19a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"/> <rect x="0" y="0" width="36" height="36" fillOpacity="0"/> </g>
                                        </svg>
                                    </Link>
                                    <span className="absolute -top-7 -left-8 bg-violet-700 opacity-50 text-xs py-1 px-1.5 border rounded rounded-md w-max text-center hidden group-hover:block">
                                        <span className="text-white m-0 p-0 after:content-[''] after:absolute after:top-full after:left-1/2 after:border-4 after:border-t-violet-600 after:border-r-transparent after:border-b-transparent after:border-l-transparent after:-ml-1">View Details</span> 
                                    </span>
                                </div>
                                {/* Update Hotel Button */}
                                <div className="relative mr-1.5 group h-min">
                                    <Link to={`./edit/${room._id}`}>
                                        <svg width={21} height={21} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="">
                                            <g strokeWidth="0"/>
                                            <g strokeLinecap="round" strokeLinejoin="round"/>
                                            <g> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#863aee" strokeWidth="1.5" strokeinecap="round" strokeLinejoin="round"/> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#863aee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </g>
                                        </svg>
                                    </Link>
                                    <span className="absolute -top-6 -left-1/2 ml-0.5 bg-violet-700 opacity-50 text-xs py-0.5 px-2 border rounded rounded-md w-max text-center hidden group-hover:block">
                                        <span className="text-white m-0 p-0 after:content-[''] after:absolute after:top-full after:left-1/2 after:border-4 after:border-t-violet-600 after:border-r-transparent after:border-b-transparent after:border-l-transparent after:-ml-1">Edit</span> 
                                    </span>
                                </div>
                                {/* Delete Hotel Button */}
                                <div className="relative mr-1.5 group h-min">
                                    <button className='self-start' /* onClick={() => deleteHotelClick(hotel._id)} */>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={18} fill="rgb(134, 58, 238)"><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                                    </button>
                                    <span className="absolute -top-8 -left-5 ml-1 bg-violet-700 opacity-50 text-xs py-1 px-1.5 border rounded rounded-md w-max text-center hidden group-hover:block">
                                        <span className="text-white m-0 p-0 after:content-[''] after:absolute after:top-full after:left-1/2 after:border-4 after:border-t-violet-600 after:border-r-transparent after:border-b-transparent after:border-l-transparent after:-ml-1">Delete</span> 
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p>Price per night: Rs. {room.pricePerNight}</p>
                            </div>
                            <div>
                                <p>Adults: {room.capacityPerRoom.adults}</p>
                            </div>
                            <div>
                                <p>Children: {room.capacityPerRoom.children}</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p>Total Rooms: {room.totalQuantity}</p>
                            </div>
                            <div>
                                <p>Available Rooms: {room.availableQuantity}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div> 
        : 
            <div></div>
        }
        </div>
    );
}