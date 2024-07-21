import React from 'react';
import { Outlet } from 'react-router-dom';
import VerticalMenu from './VerticalMenu';

const Layout = () => {
  return (
    <div className="flex">
      <VerticalMenu />
      <div className="flex-grow p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
