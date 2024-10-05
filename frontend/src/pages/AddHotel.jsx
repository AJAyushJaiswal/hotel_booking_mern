import ManageHotelForm from "../forms/HotelForm/ManageHotelForm.jsx";
import {useMutation} from 'react-query';
import {addHotel} from '../api-services/hotel.api-services.js';
import {useAppContext} from '../contexts/AppContext.jsx';

export default function AddHotel(){
    const {showToast} = useAppContext();

    const {mutate, isLoading} = useMutation(addHotel, {
        onSuccess: (result) => {
            showToast({message: result.message, success:result.success});
        },
        onError: (error) => {
            showToast({message: error.message, success: false});
        }
    });

    const handleSaveHotel = (hotelFormData) => {
        mutate(hotelFormData);
    }

    return(
        <ManageHotelForm onSave={handleSaveHotel} isLoading={isLoading}/>
    ); 
}