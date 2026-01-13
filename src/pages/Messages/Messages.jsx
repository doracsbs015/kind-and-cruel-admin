import { useEffect, useState } from "react";
import {
  getAdminMessages,
  createAdminMessage,
  updateAdminMessage,
  deleteAdminMessage,
} from "../../services/api";
import { FaEdit, FaTrash } from "react-icons/fa"; 
import toast from "react-hot-toast";
import "./Messages.css";

const categories = ["bible", "strong", "comfort", "share"];

const Messages = () => {
  const token = localStorage.getItem("adminToken");
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ text: "", category: "bible" });

  const fetchMessages = async () => {
    try {
      const res = await getAdminMessages(token);
      setMessages(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch messages");
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getAdminMessages(token);
        if (mounted) setMessages(res);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch messages");
      }
    })();
    return () => { mounted = false; };
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      return toast.error("Please fill out this field");
    }
    try {
      if (editingId) {
        await updateAdminMessage(token, editingId, formData);
        toast.success("Message updated successfully ✅");
      } else {
        await createAdminMessage(token, formData);
        toast.success("Message created successfully ✅");
      }
      setFormData({ text: "", category: "bible" });
      setEditingId(null);
      setShowForm(false);
      fetchMessages();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save message");
    }
  };

  const handleEdit = (msg) => {
    setEditingId(msg._id);
    setFormData({ text: msg.text, category: msg.category });
    setShowForm(true);
  };

 // ✅ Delete with toast confirmation
const handleDelete = (id) => {
  toast.promise(
    (async () => {
      try {
        await deleteAdminMessage(token, id);
        await fetchMessages(); // wait for refresh before showing success
        return Promise.resolve(); // resolves the toast success
      } catch (err) {
        return Promise.reject(err); // triggers toast error
      }
    })(),
    {
      loading: "Deleting message...",
      success: "Message deleted ✅",
      error: "Failed to delete message",
    }
  );
};


  const filteredMessages = filter
    ? messages.filter((m) => m.category === filter)
    : messages;

  return (
    <div className="messages-page">
      <div className="messages-header">
        <h2>Quotes</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          + Add Quote
        </button>
      </div>

      <select
        className="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {showForm && (
        <form className="message-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter message"
            value={formData.text}
            onChange={(e) =>
              setFormData({ ...formData, text: e.target.value })
            }
            required
          />
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button type="submit" className="create-btn">
            {editingId ? "Update" : "Create"}
          </button>
        </form>
      )}

      <div className="messages-list">
        {filteredMessages.map((msg) => (
          <div key={msg._id} className="message-card">
            <p>{msg.text}</p>
            <span className="category">{msg.category}</span>
            <div className="actions">
              <FaEdit onClick={() => handleEdit(msg)} className="icon edit" />
              <FaTrash
                onClick={() => handleDelete(msg._id)}
                className="icon delete"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
