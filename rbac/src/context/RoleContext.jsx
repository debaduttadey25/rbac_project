
import React, { createContext, useState, useContext } from "react";

const RoleContext = createContext();

export const useRoleContext = () => useContext(RoleContext);

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["view_users", "edit_users"] },
    { id: 2, name: "Editor", permissions: ["view_users"] },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "shreemant", role: "Admin" },
    { id: 2, name: "Debadutta", role: "Editor" },
  ]);

  const addRole = (role) => setRoles((prev) => [...prev, role]);
  const addUser = (user) => setUsers((prev) => [...prev, user]);

  // Function to update a role by its id
  const updateRole = (updatedRole) => {
    setRoles((prev) =>
      prev.map((role) => (role.id === updatedRole.id ? updatedRole : role))
    );
  };

  // Function to update a user by their id
  const updateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <RoleContext.Provider
      value={{ roles, users, addRole, addUser, updateRole, updateUser }}
    >
      {children}
    </RoleContext.Provider>
  );
};
