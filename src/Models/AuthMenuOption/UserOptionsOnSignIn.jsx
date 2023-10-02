import React from 'react';
import { useNavigate } from 'react-router-dom';
const UserOptionsMenu = ({ onSignOut }) => {
  const navigate = useNavigate();
  return (
    <div className="user-options-menu">
      <ul>
        <li onClick={onSignOut}>Logout</li>
      </ul>
    </div>
  );
};

export default UserOptionsMenu;
