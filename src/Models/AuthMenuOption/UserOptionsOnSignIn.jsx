import React from 'react';

const UserOptionsMenu = ({ onSignOut }) => {
  return (
    <div className="user-options-menu">
      <ul>
        <li onClick={onSignOut}>Logout</li>
        {/* Add more user options here */}
      </ul>
    </div>
  );
};

export default UserOptionsMenu;
