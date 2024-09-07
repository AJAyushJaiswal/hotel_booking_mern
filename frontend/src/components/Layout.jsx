import Header from './Header.jsx';
import Footer from './Footer.jsx';
import {Outlet} from 'react-router-dom';


function Layout(){
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className="container mx-auto py-8 flex-1">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}


export default Layout;