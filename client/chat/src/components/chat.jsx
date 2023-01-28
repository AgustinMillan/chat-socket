import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./chat.css";


function Chat({ user, image, socket, url}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [storedMessages, setStoredMessages] = useState([]);
  const [startChat, setStartChat] = useState(false);

  useEffect(() => {
    const recibMessage = (e) => {
      setMessages([...messages, e]);
    };

    socket.on("messageOfOtherClient", (e)=>recibMessage(e));

    return () => {
      socket.off("messageOfOtherClient", (e)=>recibMessage(e));
    };
  }, [messages]);

  if (!startChat) {
    axios
      .get(url + "api/messages")
      .then((res) => res.data.messages)
      .then((res) => setStoredMessages(res))
      .then(setStartChat(true));
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit("newMessageClient", {message, user,image});
      const newMessage = {
        message: message,
        from: "Me",
        image: image,
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      axios.post(url + "api/save", {
        message,
        from: user,
        imageURL: image,
      });
    } else {
      alert("No puedes enviar mensajes vacios");
    }
  };
  const llevar = () => {
    const destino = document.getElementById("llevar");
    destino.scrollIntoView({ top: destino });
  };
  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-body">
          <h5 className="text-center">CHAT</h5>
          <div className="card mt-3 mb-3" id="containetChat">
            <div className="card-body" style={{ position: "relative" }}>
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
                      {message.from !== user && message.from !== "Me"? (
                        <img
                          className="imgPerfil"
                          src={
                            message.imageURL
                              ? message.imageURL
                              : "http://cdn.onlinewebfonts.com/svg/img_264570.png"
                          }
                          alt={`${index}`}
                        />
                      ) : null}
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
                      {message.from === "Me" || message.from === user ? (
                        <img
                          className="imgPerfil"
                          src={image.length ? image : null}
                          alt="imagePerfil"
                        />
                      ) : null}
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
                    {e.from !== user && e.from !== "Me" ? 
                      <img
                        className="imgPerfil"
                        src={
                          e.imageURL
                            ? e.imageURL
                            : "http://cdn.onlinewebfonts.com/svg/img_264570.png"
                        }
                        alt={`${index}`}
                      />
                     : null}
                    <div
                      className={`card mb-3 border-1 ${
                        e.from === "Me" || e.from === user
                          ? "bg-success bg-opacity-25"
                          : "bg-light"
                      }`}
                    >
                      <div className="card-body">
                        <small className="text-muted">
                          {e.from === "Me" || e.from === user ? "Me" : e.from}:
                          {e.message}
                        </small>
                      </div>
                    </div>
                    {e.from === "Me" || e.from === user ? (
                        <img
                          className="imgPerfil"
                          src={image}
                          alt={`${index}P`}
                        />
                      ) : null}
                  </div>
                );
              })}
              <div
                id="llevar"
                ref={llevar}
                style={{ position: "absolute", bottom: 0 }}
              ></div>
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
