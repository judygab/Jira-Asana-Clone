import React from 'react';
import Header from './Header';

const Layout = ({ children }: any) => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
