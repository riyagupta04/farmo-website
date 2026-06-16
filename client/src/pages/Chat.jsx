import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:5000");

function Chat() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { receiverId } = useParams();

  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // SAFE ROOM ID
  const roomId =
    user && receiverId
      ? [user._id, receiverId].sort().join("_")
      : "";

  // 1. JOIN & LEAVE ROOM WITH AUTO CLEANUP
  useEffect(() => {
    if (!roomId || receiverId === user._id) return;

    socket.emit("join_room", roomId);
    console.log("Joined Room:", roomId);

    // Clean up and leave room when switching chat partners or unmounting
    return () => {
      socket.emit("leave_room", roomId);
      console.log("Left Room:", roomId);
    };
  }, [roomId, receiverId, user._id]);

  // 2. LOAD OLD MESSAGES FROM DATABASE
  useEffect(() => {
    if (!roomId) return;

    axios.get(`http://localhost:5000/api/messages/${roomId}`)
      .then((res) => setMessages(res.data))
      .catch(console.log);
  }, [roomId]);

  // 3. RECEIVE REAL-TIME MESSAGES (PREVENT DUPLICATES)
  useEffect(() => {
    const handler = (data) => {
      if (data.roomId !== roomId) return;

      setMessages((prev) => {
        const exists = prev.find(m => m._id === data._id);
        if (exists) return prev;

        return [...prev, data];
      });
    };

    socket.on("receive_message", handler);

    return () => socket.off("receive_message", handler);
  }, [roomId]);

  // 4. AUTO-SCROLL TO LATEST MESSAGE
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 5. SEND MESSAGE HANDLER
  const sendMessage = async () => {
    if (!message.trim()) return;

    const messageData = {
      senderId: user._id,
      receiverId,
      roomId,
      text: message.trim(),
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        messageData
      );

      // Emit message data to socket server
      socket.emit("send_message", res.data);

      // Update own UI instantly
      setMessages(prev => [...prev, res.data]);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      {/* MESSAGE WINDOW */}
      <div className="h-[500px] overflow-y-auto border p-4">
        {messages.map(msg => (
          <div key={msg._id} className="mb-2">
            <strong>{msg.senderId === user._id ? "You: " : "Them: "}</strong>
            {msg.text}
          </div>
        ))}
        {/* Invisible anchor element that the window scrolls down to */}
        <div ref={messagesEndRef}></div>
      </div>

      {/* INPUT ACTIONS */}
      <div className="mt-4 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Optional helper to send on enter press
          className="border p-2 flex-grow rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;