export default function Header(){
    return (
        <header>
                <div className="shadow-md mx-auto">
                <nav className="container flex justify-between py-5 px-20">
                    <div className="logo">
                        <a href='/' className="text-violet-800 text-2xl font-bold">
                            <h1>HotelGod</h1>
                        </a>
                    </div>
                
                    <ul className="flex">
                        <li className="bg-violet-700 text-white px-4 py-1 mx-2 text-lg font-semibold rounded-2xl">  <a href='/register'>Register</a></li>
                        <li className="bg-violet-700 text-white px-4 py-1 mx-2 text-lg font-semibold rounded-2xl"><a href='/login'>Login</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}