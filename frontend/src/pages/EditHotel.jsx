import {useParams, useNavigate} from 'react-router-dom';
import {useQuery, useMutation} from 'react-query';
import {getHotel} from '../api-services/hotel.api-services.js';
import {useAppContext} from '../contexts/AppContext.jsx';
import ManageHotelForm from '../forms/HotelForm/ManageHotelForm.jsx';
import {updateHotel} from '../api-services/hotel.api-services.js';

export default function EditHotel(){
    const {hotelId} = useParams();
    const {showToast} = useAppContext();
    const navigate = useNavigate(); 

    const {data:hotelData} = useQuery('getHotel', () => getHotel(hotelId), {
        enabled: !!hotelId,
        onError: (error) => {
            showToast({message: error.message, success: false});
        }
    });

    const {mutate, isLoading} = useMutation(updateHotel, {
        onSuccess: (result) => {
            showToast({message: result.message, success: result.success});
            navigate('/hotels');
        },
        onError: (error) => {
            showToast({message: error.message, success: false});
        }
    });
    
    const handleSaveHotel = (hotelFormData) => {
        mutate({hotelId, hotelFormData});
    }

    return(
        <ManageHotelForm hotelData={hotelData} onSave={handleSaveHotel} isLoading={isLoading}/>        
    );
}