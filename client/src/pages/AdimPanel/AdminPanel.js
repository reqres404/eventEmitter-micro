import axios from "axios";
import { useState, useEffect } from "react";
import { IoMdTrash } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import "./AdminPanel.css"; // Import CSS file for styling

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);
  const userId = localStorage.getItem('user_id');

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/user/");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/user/${userId}`);
      getUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  const makeAdmin = async (userId) => {
    try {
      await axios.put(`/api/user/${userId}`);
      getUsers(); // Refresh the user list after making admin
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getRole = async () => {
      try {
        if (!userId) {
          console.log("Please login or register");
          
          return;
        }

        const response = await axios.get(`/api/user/${userId}`);
        setAdmin(response.data.userRole);
      } catch (error) {
        console.error(error);
      }
      
    };

    getRole();
  }, [userId]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      {!admin && <h2>Only admins can view the information</h2>}
      {admin && (
        <>
          {users.map((user) => (
            !user.Admin && (
              <div key={user._id} className="user-card">
                <p className="user-field">
                  <span className="field-label">{user.name}</span>
                </p>
                <p className="user-field">
                  <span className="field-label">{user.email}</span>
                </p>
                <p className="user-field">
                  <span className="field-label">Role:</span>{" "}
                  {user.Admin ? "Admin" : "User"}
                </p>
                <div className="user-field">
                  <IoMdTrash
                    onClick={() => handleDelete(user._id)}
                    className="field-label"
                    style={{ color: "red", cursor: "pointer" }}
                  />
                </div>
                <div className="user-field">
                  <RiAdminFill
                    onClick={() => makeAdmin(user._id)}
                    className="field-label"
                    style={{ color: "green", cursor: "pointer" }}
                  />
                </div>
              </div>
            )
          ))}
        </>
      )}
    </div>
  );
};

export default AdminPanel;