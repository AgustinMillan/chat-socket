import './App.css'
import { io } from "socket.io-client";
import { useState } from 'react';
import { useEffect } from 'react';

const socket = io("http://localhost:3000");
function App() {
  const [message,setMessage] = useState("")
  const handleSubmit = (e)=>{
    e.preventDefault();
    socket.emit("messageOfClient", message)
    setMessage("");
  }
  useEffect(()=>{
    const recibM = (message)=>console.log(message)
    socket.on("messageOfServer", recibM(messageS))
  },[])
  return (
    <div className="App">
      <form onSubmit={e=>handleSubmit(e)}>
        <input type="text" onChange={e=>setMessage(e.target.value)} value={message}/>
        <button>Send</button>
      </form>
    </div>
  )
}

export default App
