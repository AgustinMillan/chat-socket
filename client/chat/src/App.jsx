import './App.css'
import { io } from "socket.io-client";
import { useState } from 'react';
import { useEffect } from 'react';
import Login from './components/login';
import Logout from './components/logout';
import { useAuth0 } from '@auth0/auth0-react';

const url = import.meta.env.VITE_URL
const socket = io(url);
function App() {
  const {user,isLoading,isAuthenticated} = useAuth0();
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
  if (isLoading) {
    return(<div className="App">
      <h1>Loading</h1>
    </div>)
  }else if(isAuthenticated){
return (<div className="App">
<Logout/>
<form onSubmit={e=>handleSubmit(e)}>
  <input type="text" onChange={e=>setMessage(e.target.value)} value={message}/>
  <button>Send</button>
</form>
<div>
  {messages.map(e=>(<p>{e.from}:{e.body}</p>))}
</div>
</div>)
  }else{
    return (<div className="App">
    <Login/>
    <form onSubmit={e=>handleSubmit(e)}>
      <input type="text" onChange={e=>setMessage(e.target.value)} value={message}/>
      <button>Send</button>
    </form>
    <div>
      {messages.map(e=>(<p>{e.from}:{e.body}</p>))}
    </div>
  </div>)
  }
}

export default App
