import ManageRoomForm from '../forms/RoomForm/ManageRoomForm.jsx';
import {useMutation} from 'react-query';
import {addRoom} from '../api-services/room.api-services.js';
import {useAppContext} from '../contexts/AppContext.jsx';
import {useParams} from 'react-router-dom';

export default function AddRoom(){
    const {showToast} = useAppContext();
    const {hotelId} = useParams();

    const {mutate, isLoading} = useMutation(addRoom, {
        onSuccess: async (result) => {
            showToast({message: result.message, success: result.success});
        },
        onError: async (error) => {
            showToast({message: error.message, success: false});
        }
    });
    
    const saveRoom = (formData) => {
        mutate({hotelId, formData});
    }

    return(
        <ManageRoomForm onSave={saveRoom} isLoading={isLoading}/>
    );
}