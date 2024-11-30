import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Tarefas from './routes/Tarefas.jsx';
import Tags from './routes/Tags.jsx';
import Login from './routes/Login.jsx';
import Registro from './routes/Registro.jsx';
import View_tag from './routes/View_tag.jsx';
import Edit_tag from './routes/Edit_Tag.jsx';

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
        path: "/tags/:tagId",
        element: <View_tag />
      },
      {
        path: "/tags/edit/:tagId",
        element: <Edit_tag />
      },
      {
        path: "/auth/login",
        element: <Login />
      },
      {
        path: "/auth/registro",
        element: <Registro />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
