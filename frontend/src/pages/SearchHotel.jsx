import {useQuery} from 'react-query';
import {getHotel} from '../api-services/search.api-services.js';
import {useAppContext} from '../contexts/AppContext.jsx';
import {useLocation} from 'react-router-dom';

export default function SearchHotel(){
    const {state:rooms, pathname} = useLocation();
    const hotelId = pathname.split('/').at(-1);
    const {showToast} = useAppContext();
    
    const query = new URLSearchParams();
    rooms?.map(room => query.append('rooms[]', room._id));
    const queryString = query.toString();
    
    const {data: hotel} = useQuery(['getHotel', getHotel], () => getHotel(hotelId, queryString), {
        onError: (error) => {
            showToast({message: error.message, status: false});
        }
    });
    
    console.log(hotel);
    return (
        <div className="my-20">
            <div className="flex" style={{height: '450px'}}>
                <div className="w-3/4">
                    <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full"/>
                </div>
                <div className="w-1/4 ml-1">
                    {
                        hotel.images.map(image => (
                            <img src={image} alt={hotel.name} className="w-full h-1/3"/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}