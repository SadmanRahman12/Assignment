import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaUser, FaNewspaper } from 'react-icons/fa';

const Sidebar = ({ isOpen, onPageChange }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <h3 className="p-3 logo-interactive">Author Dashboard</h3>
      <Nav className="flex-column">
        <Nav.Link onClick={() => onPageChange('Profile')}>
          <FaUser className="me-2" /> Profile
        </Nav.Link>
        <Nav.Link onClick={() => onPageChange('My Articles')}>
          <FaNewspaper className="me-2" /> My Articles
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;