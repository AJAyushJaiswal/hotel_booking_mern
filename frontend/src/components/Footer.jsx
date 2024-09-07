import {Link} from 'react-router-dom';

export default function Footer(){
    return (
        <footer className="bg-violet-600 py-5">
            <div className="container mx-auto flex justify-between items-center text-white">
                   <span className="text-2xl font-bold tracking-tight">HotelGod</span> 
        
                <span className="text-lg">
                    Copyright &copy; 2024 | All rights reserved.
                </span>
        
                <span className="text-lg font-medium">
                    <Link to="/" className="px-2">Privacy Policy</Link>
                    <Link to="/" className="px-2">Terms of Service</Link>
                </span>
            </div>
        </footer>
    );
}