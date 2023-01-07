import './App.css'
import { io } from "socket.io-client";
import { useState } from 'react';
import { useEffect } from 'react';

const socket = io("http://localhost:3000");
function App() {
  const [message,setMessage] = useState("")
  const [messages,setMessages] = useState([]);
  const handleSubmit = (e)=>{
    e.preventDefault();
    socket.emit("messageOfClient", message)
    setMessages([{from:"me",body:message},...messages])
    setMessage("");
  }
  useEffect(()=>{
    const recibM = (message)=>setMessages([message,...messages])
    socket.on("messageOfServer", (messageS)=>recibM(messageS))
  },[messages])
  return (
    <div className="App">
      <form onSubmit={e=>handleSubmit(e)}>
        <input type="text" onChange={e=>setMessage(e.target.value)} value={message}/>
        <button>Send</button>
      </form>
      <div>
        {messages.map(e=>(<p>{e.from}:{e.body}</p>))}
      </div>
    </div>
  )
}

export default App
