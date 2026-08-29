import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

function AdminUsers() {
  const { getAllUsers, setUserRole, user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getAllUsers());
  }, []);

  const toggleRole = (email, currentRole) => {
    const nextRole = currentRole === "admin" ? "user" : "admin";

    setUserRole(email, nextRole);
    setUsers(getAllUsers());
  };

  return (
    <div className="admin-page">

      <div className="admin-page-header">
        <div>
          <h1>Users</h1>
          <p>Manage registered accounts and admin access.</p>
        </div>
      </div>

      <div className="admin-panel">

        {users.length === 0 ? (

          <p className="admin-empty">
            No users registered yet.
          </p>

        ) : (

          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || "—"}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      className="admin-secondary-button"
                      disabled={user.email === currentUser?.email}
                      title={
                        user.email === currentUser?.email
                          ? "You can't change your own role"
                          : undefined
                      }
                      onClick={() => toggleRole(user.email, user.role)}
                    >
                      {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        )}

      </div>

    </div>
  );
}

export default AdminUsers;
