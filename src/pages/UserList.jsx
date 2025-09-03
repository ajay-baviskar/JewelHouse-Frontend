// File: src/pages/UserList.js

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import { fetchUsers } from "../services/user";
import "../styles/user.css";
import "../styles/loader.css";
import RegisterModal from "../components/RegisterModal";
import EditUserModal from "../components/EditUserModal";      // ✅ NEW
import ResetPasswordModal from "../components/ResetPasswordModal"; // ✅ NEW

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [resetUser, setResetUser] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchUsers(page, limit);
      setUsers(res.data);
      setTotal(res.total);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  return (
    <Layout>
      <div className="user-page">
        <div className="page-header">
          <h1 className="page-title">👥 User List</h1>
          <button className="register-btn" onClick={() => setShowModal(true)}>
            + Register User
          </button>
        </div>

        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Actions</th> {/* ✅ NEW */}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn-update"
                        onClick={() => setEditingUser(user)}
                      >
                        Edit
                      </button>&nbsp;&nbsp;&nbsp;
                      <button
                        className="btn-reset"
                        onClick={() => setResetUser(user)}
                      >
                        Reset Password
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              page={page}
              total={total}
              limit={limit}
              onPageChange={setPage}
            />
          </>
        )}

        {showModal && (
          <RegisterModal
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              setShowModal(false);
              loadUsers();
            }}
          />
        )}

        {editingUser && (
          <EditUserModal
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onSuccess={() => {
              setEditingUser(null);
              loadUsers();
            }}
          />
        )}

        {resetUser && (
          <ResetPasswordModal
            user={resetUser}
            onClose={() => setResetUser(null)}
            onSuccess={() => {
              setResetUser(null);
              loadUsers();
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default UserList;
