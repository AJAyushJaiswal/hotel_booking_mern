import {createContext, useContext, useState} from 'react';
import Toast from '../components/Toast.jsx';


const AppContext = createContext(undefined);

const AppContextProvider = ({children}) => {
    const [toast, setToast] = useState();
    
    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage);
            }
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