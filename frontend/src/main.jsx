import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom';
import {createBrowserRouter} from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import LogIn from './pages/LogIn.jsx';
import {QueryClient, QueryClientProvider} from 'react-query';
import {AppContextProvider} from './contexts/AppContext.jsx';


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
