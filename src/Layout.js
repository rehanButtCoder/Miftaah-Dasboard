import React from 'react'
import Bar from './Side/Bar'
import PrivateRoute from "./Components/PrivateRoute.jsx";

function Layout({ children }) {
  return (
    <div>
      <PrivateRoute>
        <Bar />
        {children}
      </PrivateRoute>
    </div >
  )
}

export default Layout