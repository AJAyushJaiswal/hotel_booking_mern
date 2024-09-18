import { useEffect } from "react";


const Toast = ({message, success, onClose}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        
        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    return(
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-md text-white max-w-md ${success ? "bg-green-400" : "bg-red-400"}`}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">
                    {message}
                </span>
            </div>
        </div>
    )
}


export default Toast;