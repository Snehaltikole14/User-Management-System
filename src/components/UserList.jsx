import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8080/users");
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    await fetch(`http://localhost:8080/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="p-4">
      
      <Link
        to="/add"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-green-700"
      >
        Add User
      </Link>

      
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{user.id}</td>
                <td className="border px-2 py-1">{user.name}</td>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1">
                  <div className="flex items-center space-x-4">
                   
                    <Link to={`/edit/${user.id}`}>
                      <img
                        src="public\edit_24dp_000000_FILL0_wght400_GRAD0_opsz24 (1).svg"
                        alt="edit"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                      />
                    </Link>

                    
                    <button onClick={() => deleteUser(user.id)}>
                      <img
                        src="/delete_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.svg"
                        alt="delete"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
