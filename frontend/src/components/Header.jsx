import {Link} from 'react-router-dom';

export default function Header(){
    return (
        <header className="shadow-md py-5">
            <div className="container mx-auto flex justify-between items-center">
                <div className="logo">
                    <Link to="/" className="text-violet-800 text-3xl font-extrabold tracking-tight">
                        HotelGod
                    </Link>
                </div>
            
                <ul className="flex">
                    <li className="mx-2">
                        <Link to="/register" className="bg-violet-600 text-white px-5 py-1.5 text-lg font-semibold rounded-3xl hover:bg-violet-700 active:bg-violet-800 focus:ring-red-800">Register</Link>
                    </li>
                    <li className="mx-2">
                        <Link to="/login" className="bg-violet-600 text-white px-5 py-1.5 text-lg font-semibold rounded-3xl hover:bg-violet-700 active:bg-violet-800 ">Login</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}