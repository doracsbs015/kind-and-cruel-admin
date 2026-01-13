import { useEffect, useState } from "react"; 
import {
  getSubscribers,
  sendMessageToSubscribers,
  getSentMessages,
} from "../../services/api";
import { FaEnvelope, FaList } from "react-icons/fa";
import toast from "react-hot-toast";
import "./Subscribers.css";

const Subscribers = () => {
  const token = localStorage.getItem("adminToken");
  const [subscribers, setSubscribers] = useState([]);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  const fetchData = async (token) => {
    try {
      const subs = await getSubscribers(token);
      setSubscribers(subs);
      const sent = await getSentMessages(token);
      setSentMessages(sent);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    let mounted = true;
    if (!token) return;

    (async () => {
      if (!mounted) return;
      await fetchData(token);
    })();

    return () => { mounted = false; };
  }, []);

 const handleSendMessage = async () => {
  console.log("🟡 Send button clicked");

  if (!message.trim()) {
    toast.error("Enter a message first!");
    return;
  }

  try {
    console.log("📡 Calling API with message:", message);

    const res = await sendMessageToSubscribers(token, message);

    console.log("✅ API response:", res);

    setMessage("");
    await fetchData(token);

    toast.success("Message sent to all subscribers ✅");
  } catch (err) {
    console.error("❌ Frontend send error:", err);
    toast.error("Failed to send message");
  }
};

  return (
    <div className="subscribers-page">
      <h3>Send a Message to Subscribers</h3>

      <div className="send-message-card">
        <textarea
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-btn" onClick={handleSendMessage}>
          <FaEnvelope /> Send to All
        </button>
      </div>

      <div className="subscriber-list-toggle">
        <button onClick={() => setShowSubscribers(!showSubscribers)}>
          <FaList /> {showSubscribers ? "Hide Subscribers" : "Show Subscribers"}
        </button>
      </div>

      {showSubscribers && (
        <div className="subscriber-list">
          {subscribers.length === 0 ? (
            <p>No subscribers yet.</p>
          ) : (
            subscribers.map((s) => (
              <div key={s._id} className="subscriber-card">
                <span>{s.email}</span>
                <span>{new Date(s.createdAt).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      )}

      <div className="sent-messages-section">
        <h3>Previously Sent Messages</h3>
        {sentMessages.length === 0 ? (
          <p>No messages sent yet.</p>
        ) : (
          sentMessages.map((m) => (
            <div key={m._id} className="sent-message-card">
              <p>{m.message}</p>
              <span>Sent to {m.sentToCount} subscribers on {new Date(m.createdAt).toLocaleDateString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Subscribers;
