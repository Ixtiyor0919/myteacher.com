import React, {
    lazy
  } from "react";
import LayoutMenu from "../Layout/Layout";
import Loadable from "../Components/Loadable";
  
const Home = Loadable(lazy(() =>
    import( /*webpackChunkName:'HomePage'*/ "../Pages/Clients")
))
const Users = Loadable(lazy(() =>
    import( /*webpackChunkName:'ProfilePage'*/ "../Pages/Users/Users")
))
  
const AppRouter = {
    path: '/',
    element: <LayoutMenu />,
    children: [{
        path: '/',
        element: <Home />
      },
      {
        path: 'users',
        element: <Users />
      },
    ]
};
  
export default AppRouter;