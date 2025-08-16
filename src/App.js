import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import MyArticles from './components/MyArticles';
import { FaBars, FaSun, FaMoon } from 'react-icons/fa';
import './index.css';
import './dark-mode.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('Profile');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="d-flex">
      <Sidebar isOpen={isSidebarOpen} onPageChange={handlePageChange} />
      <div className={`main-content ${isSidebarOpen ? 'open' : 'closed'}`}>
        <header className="d-flex justify-content-between align-items-center p-3 bg-light">
          <FaBars onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
          <h4 className="m-0">{activePage}</h4>
          <div onClick={toggleTheme} style={{ cursor: 'pointer' }}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </div>
        </header>
        <div className="p-4">
          {activePage === 'Profile' && <Profile />}
          {activePage === 'My Articles' && <MyArticles />}
        </div>
      </div>
    </div>
  );
}

export default App;