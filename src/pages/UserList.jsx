// File: src/pages/UserList.js

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import { fetchUsers } from "../services/user";
import "../styles/user.css";
import "../styles/loader.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

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
        <h1 className="page-title">👥 User List
        </h1>
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
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
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
      </div>
    </Layout>
  );
};

export default UserList;
