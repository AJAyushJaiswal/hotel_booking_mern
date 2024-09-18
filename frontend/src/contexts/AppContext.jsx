import {createContext, useContext} from 'react';


const AppContext = createContext(undefined);

const AppContextProvider = ({children}) => {
    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                console.log(toastMessage);
            }
        }}>
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