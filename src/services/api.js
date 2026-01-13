import axios from "axios";

const BASE_URL = "https://kind-and-cruel-backend.onrender.com/api"; // common base
const FEEDBACK_URL = `${BASE_URL}/feedback`;
const SUBSCRIBER_URL = `${BASE_URL}/subscribers`;


// 🔹 Admin login
export const adminLogin = async (credentials) => {
  try {
    const res = await axios.post(`${BASE_URL}/admin/login`, credentials);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server error" };
  }
};

// 🔹 Admin: Messages CRUD
export const getAdminMessages = async (token) => {
  const res = await axios.get(`${BASE_URL}/messages/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createAdminMessage = async (token, data) => {
  const res = await axios.post(`${BASE_URL}/messages`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateAdminMessage = async (token, id, data) => {
  const res = await axios.put(`${BASE_URL}/messages/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteAdminMessage = async (token, id) => {
  const res = await axios.delete(`${BASE_URL}/messages/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
// Feedback
export const getAdminFeedback = async (token) => {
  const res = await axios.get(FEEDBACK_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


// Get all subscribers (admin)
export const getSubscribers = async (token) => {
  const res = await axios.get(SUBSCRIBER_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Send message to all subscribers (admin)
export const sendMessageToSubscribers = async (token, message) => {
  console.log("➡️ POST /subscribers/send");

  const res = await axios.post(
    `${SUBSCRIBER_URL}/send`,
    { message },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  console.log("⬅️ Response from backend:", res.data);
  return res.data;
};

// Get previously sent messages (admin)
export const getSentMessages = async (token) => {
  const res = await axios.get(`${SUBSCRIBER_URL}/sent`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


