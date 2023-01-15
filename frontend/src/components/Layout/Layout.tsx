import React from 'react';
import './Layout.css';

type LayoutProps = {
  children: JSX.Element[] | JSX.Element;
};

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;
  return (
    <main className="main-layout">
      {children}
    </main>
  );
};

export default Layout;
