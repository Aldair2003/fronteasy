'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import './layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>TaskEase</title>
        <meta name="description" content="Task management application" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className="layout">
          <header className="nav-horizontal">
            <div className="logo-container">
              <Link href="/">
                <img src="/logo.png" alt="TaskEase Logo" className="logo-image" />
              </Link>
              <span className="logo-text">TaskEase</span>
            </div>
            <nav className="nav">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/login" className="nav-link">Login</Link>
              <Link href="/register" className="nav-link">Register</Link>
              <Link href="/profile/reset" className="nav-link">Reset Password</Link>
              <Link href="/tasks" className="nav-link">Tasks</Link>
              <Link href="/profile" className="nav-link">Profile</Link> 
            </nav>
          </header>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
