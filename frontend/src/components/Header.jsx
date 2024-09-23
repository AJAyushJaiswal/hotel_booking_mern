import {Link, NavLink} from 'react-router-dom';
import {useAppContext} from '../contexts/AppContext';
import {useMutation} from 'react-query';
import {logoutUser} from '../apiService';
import {useNavigate} from 'react-router-dom';

export default function Header(){
    const {isLoggedIn, showToast, setIsLoggedIn} = useAppContext();
    const navigate = useNavigate();
    
    const mutation = useMutation(logoutUser, {
        onSuccess: (result) => {
            showToast({message: result.message, success: result.success});
            setIsLoggedIn();
            navigate('/');
        },
        onError: (error) => {
            showToast({message: error.message, success: false});
        }
    });
    
    const logout = () => {
        mutation.mutate();
    }

    return (
        <header className="shadow-md py-5">
            <div className="container mx-auto flex justify-between items-center">
                <div className="logo">
                    <Link to="/" className="text-violet-800 text-3xl font-extrabold tracking-tight">
                        HotelGod
                    </Link>
                </div>

                <div className="flex">
                    { isLoggedIn ?
                        <ul className="flex">
                            <li className="mx-2">
                                <NavLink to="/bookings" className={`text-lg font-semibold ${({isActive}) => isActive && 'text-violet-600'}`}>My Bookings</NavLink>
                            </li>
                            <li className="mx-2">
                                <NavLink to="/hotels" className={`text-lg font-semibold ${({isActive}) => isActive && 'text-violet-600'}`}>My Hotels</NavLink>
                            </li>
                            <li className="mx-2">
                                <NavLink to="/profile" className={`text-lg font-semibold ${({isActive}) => isActive && 'text-violet-600'}`}>Profile</NavLink>
                            </li>
                        </ul>
                    :
                        <ul className="flex">
                            <li className="mx-2">
                                <Link to="/#hotels" className="text-lg font-semibold">Hotels</Link>
                            </li>
                            <li className="mx-2">
                                <Link to="/#offers" className="text-lg font-semibold">Offers</Link>
                            </li>
                            <li className="mx-2">
                                <Link to="/#testimonials" className="text-lg font-semibold">Testimonials</Link>
                            </li>
                            <li className="mx-2">
                                <Link to="/#contact_us" className="text-lg font-semibold">Contact Us</Link>
                            </li>
                        </ul>
                    }
                </div>
        
                {isLoggedIn ? 
                    <button to="/logout" className="bg-violet-600 text-white px-5 py-1.5 text-lg font-semibold rounded-3xl hover:bg-violet-700 active:bg-violet-800" onClick={logout}>Logout</button>
                : 
                    <ul className="flex">
                        <li className="mx-2">
                            <Link to="/register" className="bg-violet-600 text-white px-5 py-1.5 text-lg font-semibold rounded-3xl hover:bg-violet-700 active:bg-violet-800 focus:ring-red-800">Register</Link>
                        </li>
                        <li className="mx-2">
                            <Link to="/login" className="bg-violet-600 text-white px-5 py-1.5 text-lg font-semibold rounded-3xl hover:bg-violet-700 active:bg-violet-800 ">Login</Link>
                        </li>
                    </ul>
                }
            
            </div>
        </header>
    );
}