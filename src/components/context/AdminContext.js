import React, { createContext, useContext, useEffect, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const adminId = localStorage.getItem('adminId');

    if (loggedIn && adminId) {
      setAdmin({ id: adminId, });
    }
  }, []);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
