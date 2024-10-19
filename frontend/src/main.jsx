import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom';
import {createBrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {AppContextProvider} from './contexts/AppContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import LogIn from './pages/LogIn.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AddHotel from './pages/AddHotel.jsx';
import MyHotels from './pages/MyHotels.jsx';
import EditHotel from './pages/EditHotel.jsx';
import AddRoom from './pages/AddRoom.jsx';
import HotelRooms from './pages/HotelRooms.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: 'login',
        element: <LogIn/>
      }
    ]
  },
  {
    path: '/hotels',
    element: <ProtectedRoute><Layout/></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <MyHotels/>
      },
      {
        path: 'add',
        element: <AddHotel/>
      },
      {
        path: 'edit/:hotelId',
        element: <EditHotel/>
      },
      {
        path: ':hotelId/rooms/',
        children: [
          {
            index: true,
            element: <HotelRooms/>
          },
          {
            path: 'add',
            element: <AddRoom/>
          }
        ]
      }
    ]
  },
]);


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <RouterProvider router={router}/>
      </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
