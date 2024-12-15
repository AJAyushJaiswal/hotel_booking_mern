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
    
    const {data} = useQuery(['getHotel', getHotel], () => getHotel(hotelId, queryString), {
        onError: (error) => {
            showToast({message: error.message, status: false});
        }
    });
    
    console.log(data);
    return (
        <div>
            Hotel Page
        </div>
    );
}