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
import EditRoom from './pages/EditRoom.jsx';
import {SearchContextProvider} from './contexts/SearchContext.jsx';
import Search from './pages/Search.jsx';
import SearchHotel from './pages/SearchHotel.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchContextProvider><Layout/></SearchContextProvider>,
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
      },
      {
        path: '/search',
        element: <Search/>
      },
      {
        path: '/search/:hotelId',
        element: <SearchHotel/>
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
          },
          {
            path: 'edit/:roomId',
            element: <EditRoom/>
          }
        ]
      }
    ]
  }
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
