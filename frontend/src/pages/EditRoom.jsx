import ManageRoomForm from '../forms/RoomForm/ManageRoomForm.jsx';
import {useQuery, useMutation} from 'react-query';
import {getRoom, updateRoom} from '../api-services/room.api-services.js';
import {useParams} from 'react-router-dom';
import {useAppContext} from '../contexts/AppContext';

export default function EditRoom(){
    const {hotelId, roomId} = useParams();
    const {showToast} = useAppContext();

    const {data:prevRoomData} = useQuery('getRoom', () => getRoom(hotelId, roomId), {
        enabled: !!hotelId && !!roomId,
        onError: async (error) => {
            showToast({message: error.message, success: false});
        }
    });
    
    const {mutate, isLoading} = useMutation(updateRoom, {
        onSuccess: async (result) => {
            showToast({message: result.message, success: result.success});
        },
        onError: async (error) => {
            showToast({message: error.message, success: false});
        }
    });
    
    const onSave = (newFormData) => {
        mutate({hotelId, roomId, newFormData});
    };
    
    return(
        <ManageRoomForm onSave={onSave} isLoading={isLoading} prevRoomData={prevRoomData}/>
    );
}