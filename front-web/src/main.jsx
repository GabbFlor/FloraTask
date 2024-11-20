import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Tarefas from './routes/Tarefas.jsx';
import Tags from './routes/Tags.jsx';
import Login from './routes/Login.jsx';

const routes = createBrowserRouter([
  {
    path: "/",

    element: <App />,

    // error element

    children: [
      {
        path: "/",
        element: <Tarefas />
      },
      {
        path: "/tags",
        element: <Tags />
      },
      {
        path: "/auth/login",
        element: <Login />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
