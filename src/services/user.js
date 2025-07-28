export const fetchUsers = async (page = 1, limit = 10) => {
  const res = await fetch(`http://62.72.33.172:4000/api/auth/users?page=${page}&limit=${limit}`);
  const data = await res.json();
  if (!data.success) throw new Error("Failed to fetch users");
  return data;
};
