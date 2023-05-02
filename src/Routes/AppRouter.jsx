// import Clients from "../Pages/Clients";
// import Login from "../Auth/Login/Login";
// import Users from "../Pages/Users/Users";
// import LayoutMenu from "../Layout/Layout";
// import { Route, Routes } from "react-router-dom";
// import Error404 from "../Modules/ErrorPages/Error404";
// import Error500 from "../Modules/ErrorPages/Error500";

// const RoutesPage = () => {
//     return (
//         <Routes>
//             <Route element={<LayoutMenu />}>
//                 <Route index element={<Clients />} />
//                 <Route path="users" element={<Users />} />
//             </Route>
//             <Route path="/login" element={<Login />} />
//             <Route path="*" element={<Error404 />} />
//             <Route path="server-error" element={<Error500 />} />
//         </Routes>
//     );
// };

// export default RoutesPage;
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