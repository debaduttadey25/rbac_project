import React, { useState } from "react";
import { useRoleContext } from "../context/RoleContext";

const AdminDashboard = () => {
  const { roles, users, addRole, updateRole, addUser, updateUser } =
    useRoleContext();
  const [newRole, setNewRole] = useState({ name: "", permissions: "" });
  const [updatenewRole, setupdatenewRole] = useState({ name: "", permissions: "" });

  const [editingRole, setEditingRole] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", role: "" });
  const [updatenewUser, setUpdatenewUser] = useState({ name: "", role: "" });
  const [editingUser, setEditingUser] = useState(null);


  const [editingIndex, setEditingIndex] = useState(0);
  const [isEditingRole, setIsEditingRole] = useState(false);



const[editingUserindex,setEditingUserindex]=useState(0);
const [isUsereditingRole, setIsUsereditingRole] = useState(false);



  const handleRoleSubmit = () => {
    if (isEditingRole) {
      const updatedRole = {
        ...editingRole,
        name: updatenewRole.name || editingRole.name,
        permissions: updatenewRole.permissions
          ? updatenewRole.permissions.split(",")
          : editingRole.permissions,
      };
      updateRole(updatedRole);
      setEditingRole(null);
      setupdatenewRole({ name: "", permissions: "" });
      setIsEditingRole(false);

    } else {
      const role = {
        id: roles.length + 1,
        name: newRole.name,
        permissions: newRole.permissions.split(","),
      };
      addRole(role);
    }
    setNewRole({ name: "", permissions: "" });
  };

  const handleRoleEdit = (role,index) => {
    setEditingRole(role);
    setEditingIndex(index);
    setIsEditingRole(true);
    setupdatenewRole({ name: role.name, permissions: role.permissions.join(",") });
  };


  const handleUserSubmit = () => {
    if (isUsereditingRole) {
      const updatedUser = {
        ...editingUser,
        name: updatenewUser.name || editingUser.name,
        role: updatenewUser.role || editingUser.role,
      };
      updateUser(updatedUser);
      setEditingUser(null);
      setUpdatenewUser({ name: "", permissions: "" });
      setIsUsereditingRole(false);
    } else {
      const user = {
        id: users.length + 1,
        name: newUser.name,
        role: newUser.role,
      };
      addUser(user);
    }
    setNewUser({ name: "", role: "" });
  };

  const handleUserEdit = (user,index) => {
    setEditingUser(user);
    setEditingUserindex(index);
    setIsUsereditingRole(true);
    setUpdatenewUser({ name: user.name, role: user.role });
  };



  return (
    
    <div className="min-h-screen bg-gray-50">



      
      
      <nav className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-semibold">RBAC Admin Dashboard</div>
        
        </div>
      </nav>

 
      <div className="p-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
         
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Roles</h2>
            <ul className="space-y-2 mb-4">
              {roles.map((role,index) => isEditingRole && editingIndex === index ? (<div className="flex gap-6">
              <input
                type="text"
                placeholder="Role Name"
                value={updatenewRole.name}
                onChange={(e) => setupdatenewRole({ ...updatenewRole, name: e.target.value })}
                className="border rounded-md p-2 w-full"
              />
              <input
                type="text"
                placeholder="Permissions (comma-separated)"
                value={updatenewRole.permissions}
                onChange={(e) =>
                  setupdatenewRole({ ...updatenewRole, permissions: e.target.value })
                }
                className="border rounded-md p-2 w-full"
              />
              <button
  onClick={handleRoleSubmit}
  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 inline-flex items-center gap-2 whitespace-nowrap"
>
  {isEditingRole ? "Update Role" : "Add Role"}
</button>
            </div>) :(
                <li
                  key={role.id}
                  className="bg-gray-100 p-3 rounded-md flex justify-between"
                >
                  <span>
                    <span className="font-semibold">{role.name}</span> - Permissions:{" "}
                    <span className="text-gray-600">
                      {role.permissions.join(", ")}
                    </span>
                  </span>
                  <div className="space-x-2">
                    <button
                      style={{ width: "100px" }}
                      onClick={() => handleRoleEdit(role,index)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex gap-6">
              <input
                type="text"
                placeholder="Role Name"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                className="border rounded-md p-2 w-full"
              />
              <input
                type="text"
                placeholder="Permissions (comma-separated)"
                value={newRole.permissions}
                onChange={(e) =>
                  setNewRole({ ...newRole, permissions: e.target.value })
                }
                className="border rounded-md p-2 w-full"
              />
              <button
  onClick={handleRoleSubmit}
  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 inline-flex items-center gap-2 whitespace-nowrap"
>
  Add Role
</button>
            </div>
          </div>

          




          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Users</h2>
            <ul className="space-y-2 mb-4">
              {users.map((user,index) =>isUsereditingRole && editingUserindex === index ? (  <div className="flex gap-6">
              <input
                type="text"
                placeholder="User Name"
                value={updatenewUser.name}
                onChange={(e) => setUpdatenewUser({ ...updatenewUser, name: e.target.value })}
                className="border rounded-md p-2 w-full"
              />
              <select

                value={updatenewUser.role}
                onChange={(e) => setUpdatenewUser({ ...updatenewUser, role: e.target.value })}
                className="border rounded-md p-2 w-full"
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
              <button
  onClick={handleUserSubmit}
  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 whitespace-nowrap"
>
  Update User
</button>
            </div>): (
                <li
                  key={user.id}
                  className="bg-gray-100 p-3 rounded-md flex justify-between"
                >
                  <span>
                    <span className="font-semibold">{user.name}</span> - Role:{" "}
                    <span className="text-gray-600">{user.role}</span>
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleUserEdit(user,index)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Edit
                    </button>
                    
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex gap-6">
              <input
                type="text"
                placeholder="User Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="border rounded-md p-2 w-full"
              />
              <select

                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="border rounded-md p-2 w-full"
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
              <button
  onClick={handleUserSubmit}
  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 whitespace-nowrap"
>
  Add User
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


