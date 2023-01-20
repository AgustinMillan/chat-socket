import React from "react";
import io from "socket.io-client";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./chat.css";

const url = import.meta.env.VITE_URL;
const socket = io(url);
function Chat({ user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [storedMessages, setStoredMessages] = useState([]);
  const [startChat, setStartChat] = useState(false);

  useEffect(() => {
    const recibMessage = (messa) => {
      setMessages([messa, ...messages]);
    };

    socket.on("messageOfOtherClient", recibMessage);

    return () => {
      socket.off("messageOfOtherClient", recibMessage);
    };
  }, [messages]);

  if (!startChat) {
    axios
      .get(url + "/api/messages")
      .then((res) => res.data.messages)
      .then((res) => setStoredMessages(res))
      .then(res=> res?setStartChat(true):null);
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit("newMessageClient", message, user);
      const newMessage = {
        message: message,
        from: "Me",
      };
      setMessages([newMessage, ...messages]);
      setMessage("");

      axios.post(url + "/api/save", {
        message,
        from: user,
      });
    } else {
      alert("No puedes enviar mensajes vacios");
    }
  };
  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-body">
          <h5 className="text-center">CHAT</h5>
          <div className="card mt-3 mb-3" id="containetChat">
            <div className="card-body">
              {storedMessages.length &&
                storedMessages.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`d-flex p-3 ${
                        message.from === "Me" || message.from === user
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className={`card mb-3 border-1 ${
                          message.from === "Me" || message.from === user
                            ? "bg-success bg-opacity-25"
                            : "bg-light"
                        }`}
                      >
                        <div className="card-body">
                          <small className="text-muted">
                            {message.from === "Me" || message.from === user
                              ? "Me"
                              : message.from}
                            :{message.message}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <small className="text-center text-muted">
                -Mesanjes Anteriores-
              </small>
              {messages.map((e, index) => {
                return (
                  <div
                    key={index}
                    className={`d-flex p-3 ${
                      e.from === "Me" || e.from === user
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`card mb-3 border-1 ${
                        e.from === "Me" || e.from === user
                          ? "bg-success bg-opacity-25"
                          : "bg-light"
                      }`}
                    >
                      <small className="text-muted">
                        {e.from === "Me" || e.from === user
                          ? "Me"
                          : { e: from }}
                        :{e.message}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
            <form onSubmit={(e) => sendMessage(e)}>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  value={message}
                  placeholder="Message..."
                  autoComplete="off"
                  id="formMessage"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className="btn btn-success mx-3"
                  type="submit"
                  id="btnSend"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
