import {Link} from 'react-router-dom';
import {useState} from 'react';

export default function SearchResultCard({hotel}){
    const [imageNo, setImageNo] = useState(0);
    
    const handleImagePrevBtn = () => {
       if(imageNo >= 1) setImageNo(prev => prev-1); 
    }

    const handleImageNextBtn = () => {
       if(imageNo < hotel.images.length-1) setImageNo(prev => prev+1); 
    }

    return(
        <div className="border border-gray-300 rounded-lg p-6 mb-6 flex" key={hotel._id}>
            <div className="mr-6 w-80 h-52 relative">
                <div className="w-full flex justify-between px-4 absolute top-24">
                    <button className="p-2.5 bg-black rounded-3xl opacity-65 hover:opacity-75 active:opacity-90" onClick={handleImagePrevBtn}>
                        <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 103.537 103.537" xmlSpace="preserve" stroke="#ffffff"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M103.048,12.002c-1.445-3.771-5.679-5.649-9.438-4.207L4.692,41.9c-2.753,1.055-4.603,3.662-4.688,6.609 c-0.087,2.948,1.608,5.656,4.295,6.872l88.917,40.196c0.978,0.44,2,0.65,3.006,0.65c2.784,0,5.442-1.6,6.665-4.302 c1.661-3.678,0.029-8.007-3.648-9.671L26.273,49.277l72.568-27.834C102.61,19.998,104.496,15.771,103.048,12.002z"></path> </g> </g> </g></svg>
                    </button>
                    <button className="p-2.5 bg-black rounded-3xl opacity-65 hover:opacity-75 active:opacity-90" onClick={handleImageNextBtn}>
                        <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 103.536 103.536" xmlSpace="preserve" stroke="#ffffff"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g> <g> <g> <path d="M0.65,91.928c1.221,2.701,3.881,4.3,6.665,4.3c1.006,0,2.029-0.209,3.006-0.65l88.917-40.195 c2.688-1.216,4.381-3.925,4.295-6.873c-0.085-2.948-1.934-5.554-4.687-6.609L9.929,7.794C6.17,6.352,1.933,8.23,0.489,12.001 c-1.447,3.769,0.438,7.995,4.207,9.44l72.569,27.834L4.299,82.255C0.62,83.92-1.012,88.249,0.65,91.928z"></path> </g> </g> </g></svg>
                    </button>
                </div>
                <img src={hotel.images[imageNo]} alt={hotel.name} className="w-full h-full rounded-xl"/>
            </div>
            <div className="w-full">
                <div className="relative">
                    <div className="flex items-center">
                        <h3 className="font-semibold text-2xl mr-3">{hotel.name}</h3>
                        <span className="flex mb-0.5">
                            {Array.from({length: parseInt(hotel.starRating)}).map((_, index) => (
                                    <svg key={index} width="16px" height="16px" className="mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#803aea"></path> </g></svg>
                                ))}
                        </span>
                    </div>
                    <p className="absolute top-6 text-sm">{hotel.address}, {hotel.city}, {hotel.country}</p>
                </div>
                <div className="mt-10">
                    <p>Property Type: {hotel.type}</p>
                    <p>Room Types Matched: {hotel.roomCount}</p>
                </div>
                <div className="flex justify-between mt-7 pt-2 mr-2">
                    <div className="flex items-end">
                        {
                            hotel.facilities.slice(0, 3).map((facility) => (
                                <p className="bg-slate-400 text-white rounded-lg py-1 px-3 mr-3" key={facility}>{facility}</p>
                            ))
                        }
                        <p className="text-gray-600">{hotel.facilities.length > 3 ? `+${hotel.facilities.length - 3} more` : ''}</p>
                    </div>
                    <div>
                        <p className="mb-1 font-semibold text-right">&#x20B9; {hotel.minPrice}</p>
                        <Link to={`./${hotel._id}`} state={hotel.rooms} className="bg-violet-600 px-2 py-1 rounded text-white">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    ); 
}