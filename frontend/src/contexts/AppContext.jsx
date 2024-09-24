import {createContext, useContext, useState} from 'react';
import Toast from '../components/Toast.jsx';
import {useQuery, useQueryClient} from 'react-query';
import {validateToken} from '../apiService.js';


const AppContext = createContext(undefined);

const AppContextProvider = ({children}) => {
    const [toast, setToast] = useState();
    
    const queryClient = useQueryClient();

    const {isError} = useQuery("validateToken", validateToken, {retry: false});  
    
    const setIsLoggedIn = async () => {
        await queryClient.invalidateQueries('validateToken');        
    }
    
    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage);
            },
            isLoggedIn: !isError,
            setIsLoggedIn
        }}>
            {toast && (<Toast message={toast.message} success={toast.success} onClose={() => setToast(undefined)}/>)}
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
}


export {
    AppContextProvider,
    useAppContext
}