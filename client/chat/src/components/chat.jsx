import React from "react";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
const url = import.meta.env.VITE_URL;
const socket = io(url);

function Chat({user}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("messageOfClient", { from: user.name, message });
    setMessages([{ from: "me", body: message, type: 2 }, ...messages]);
    setMessage("");
  };
  useEffect(() => {
    const recibM = (message) => setMessages([message, ...messages]);
    socket.on("messageOfServer", (messageS) => recibM(messageS));
    socket.on("connectNewUserToServer", (messageS) => recibM(messageS));
  }, [messages]);
  return (
    <div>
      {" "}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button>Send</button>
      </form>
      <div>
        {messages.map((e) =>
          e.type === 2 ? (
            <p key={e.body}>
              {e.from}:{e.body}
            </p>
          ) : (
            <p key={e.body}>{e.body}</p>
          )
        )}
      </div>
    </div>
  );
}

export default Chat;
