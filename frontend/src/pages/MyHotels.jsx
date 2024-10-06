import {useQuery} from 'react-query';
import {Link} from 'react-router-dom';
import {getMyHotels} from '../api-services/hotel.api-services.js';


export default function MyHotels(){
    const {data:hotelData} = useQuery('getMyHotels', getMyHotels, {
        onError: (error) => {
            showToast({message: error.message, success: false});
        }
    });
    
    return (
        <div className="my-16 w-4/5 m-auto">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-center">My Hotels</h1>
                <div className="sticky top-20 right-10">
                    <Link to="./add" className="bg-violet-600 text-white py-1.5 px-2.5 rounded-3xl text-md font-medium pointer flex items-center hover:bg-violet-700">
                        Add Hotel 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" width={13} className="ml-1"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                    </Link>                
                </div>
            </div>
            {!hotelData?.data?.length ? <div className='mt-24 text-center text-md text-gray-600'>No Hotels found</div> : 
                <div className="mt-10">
                    {hotelData.data.map((hotel, index) => (
                        <div key={index} className="border border-gray-300 px-10 py-6 mb-12">
                            <div className="flex justify-between">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold leading-3">{hotel.name}</h3> 
                                    <span className="text-sm">{hotel.address}, {hotel.city},{hotel.country}</span> 
                                </div>
                                <div className="flex">
                                    {/* View Full Details Button */}
                                    <Link to={`./${hotel._id}`} className="mr-1.5">
                                        <svg fill="#8a3aee" width={23} height={23} viewBox="0 0 36.00 36.00" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" stroke="#8a3aee" strokeWidth="0.00036">
                                            <g strokeWidth="0"/>
                                            <g strokeLinecap="round" strokeLinejoin="round"/>
                                            <g id="SVGRepo_iconCarrier"><path d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6Zm0,22H4V8H32Z"/>
                                            <path d="M9,14H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"/>
                                            <path d="M9,18H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"/>
                                            <path d="M9,22H19a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"/> <rect x="0" y="0" width="36" height="36" fillOpacity="0"/> </g>
                                        </svg>
                                    </Link>
                                    {/* Update Hotel Button */}
                                    <Link to="./update" className="mr-1.5">
                                        <svg width={21} height={21} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="">
                                            <g strokeWidth="0"/>
                                            <g strokeLinecap="round" strokeLinejoin="round"/>
                                            <g> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#863aee" strokeWidth="1.5" strokeinecap="round" strokeLinejoin="round"/> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#863aee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </g>
                                        </svg>
                                    </Link>
                                    {/* Delete Hotel Button */}
                                    <button className='self-start'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={18} fill="rgb(134, 58, 238)"><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="flex gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="rgb(134, 58, 238)" width={12}><path d="M64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l80 0 0-64c0-26.5 21.5-48 48-48s48 21.5 48 48l0 64 80 0c8.8 0 16-7.2 16-16l0-384c0-8.8-7.2-16-16-16L64 48zM0 64C0 28.7 28.7 0 64 0L320 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm88 40c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16l0 48c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-48zM232 88l48 0c8.8 0 16 7.2 16 16l0 48c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-48c0-8.8 7.2-16 16-16zM88 232c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16l0 48c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-48zm144-16l48 0c8.8 0 16 7.2 16 16l0 48c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-48c0-8.8 7.2-16 16-16z"/></svg>
                                    {hotel.type}
                                </span> 
                                <span className="flex gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="rgb(134, 58, 238)" width={15}><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>
                                    {hotel.starRating || 0} star rating
                                </span> 
                                <span className="flex items-center gap-1">
                                    <svg fill="#913be8" width={20} viewBox="0 -21.66 122.88 122.88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{enableBackground:"new 0 0 122.88 79.56"}} xmlSpace="preserve" stroke="#913be8">
                                        <g strokeWidth="0"/>
                                        <g style={{fillRule:"evenodd", clipRule:"evenodd"}}> <g> <path d="M21.65,24.62h20.96c3.42,0,6.22,2.79,6.22,6.21v6.22H21.65V24.62L21.65,24.62z M7.36,79.56h5.93 c1.72,0,3.12-1.42,3.12-3.12v-9.35H4.23v9.35C4.23,78.15,5.64,79.56,7.36,79.56L7.36,79.56z M108.79,79.56h5.93 c1.72,0,3.12-1.42,3.12-3.12v-9.35h-12.18v9.35C105.67,78.15,107.08,79.56,108.79,79.56L108.79,79.56z M2.82,41.01h1.41V3.12 C4.23,1.4,5.64,0,7.35,0h5.93c1.72,0,3.12,1.4,3.12,3.12v37.89h89.26V23.14c0-1.72,1.4-3.12,3.12-3.12h5.93 c1.72,0,3.12,1.42,3.12,3.12v17.87h2.22c1.55,0,2.82,1.27,2.82,2.82v15.99c0,1.55-1.27,2.81-2.82,2.81H2.82 C1.27,62.63,0,61.36,0,59.82V43.83C0,42.28,1.27,41.01,2.82,41.01L2.82,41.01z"/> </g> </g>
                                    </svg>
                                    {hotel.availableRooms || 0} available rooms
                                </span> 
                                <span className="flex items-center gap-1">
                                    <svg fill="#913be8" width={20} viewBox="0 -21.66 122.88 122.88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{enableBackground:"new 0 0 122.88 79.56"}} xmlSpace="preserve" stroke="#913be8">
                                        <g strokeWidth="0"/>
                                        <g style={{fillRule:"evenodd", clipRule:"evenodd"}}> <g> <path d="M21.65,24.62h20.96c3.42,0,6.22,2.79,6.22,6.21v6.22H21.65V24.62L21.65,24.62z M7.36,79.56h5.93 c1.72,0,3.12-1.42,3.12-3.12v-9.35H4.23v9.35C4.23,78.15,5.64,79.56,7.36,79.56L7.36,79.56z M108.79,79.56h5.93 c1.72,0,3.12-1.42,3.12-3.12v-9.35h-12.18v9.35C105.67,78.15,107.08,79.56,108.79,79.56L108.79,79.56z M2.82,41.01h1.41V3.12 C4.23,1.4,5.64,0,7.35,0h5.93c1.72,0,3.12,1.4,3.12,3.12v37.89h89.26V23.14c0-1.72,1.4-3.12,3.12-3.12h5.93 c1.72,0,3.12,1.42,3.12,3.12v17.87h2.22c1.55,0,2.82,1.27,2.82,2.82v15.99c0,1.55-1.27,2.81-2.82,2.81H2.82 C1.27,62.63,0,61.36,0,59.82V43.83C0,42.28,1.27,41.01,2.82,41.01L2.82,41.01z"/> </g> </g>
                                    </svg>
                                    {hotel.totalRooms || 0} total rooms
                                </span> 
                            </div>
                        </div> 
                    ))}
                </div>
            }
        </div>
    );
}