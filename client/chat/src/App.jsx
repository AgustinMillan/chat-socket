import "./App.css";
import Login from "./components/login";
import Logout from "./components/logout";
import Chat from "./components/chat";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import ChatsList from "./components/chatsList";

const url = "http://localhost:3000/";
// const url = "https://chat-socket-production-ff17.up.railway.app/";

const socket = io(url);
function App() {
  const { user,isLoading, isAuthenticated } = useAuth0();
  const conecctionStart = async()=>{
    let resOfAxios =  await axios.get(`${url}user?email=${user.email}&name=${user.name}`);
    socket.emit("connectStart", resOfAxios.data);
  }
  useEffect(()=>{
    if(user){
      conecctionStart()
    }
  },[user])
  if (isLoading) {
    return (
      <div className="App">
        <h1>Loading</h1>
      </div>
    
    );
  } else if (isAuthenticated) {
    return (
      <div className="App">
        <Logout />
        <div className="containerChatsAndChat">
          <ChatsList/>
        <Chat user={user.name} image={user.picture} socket={socket} url={url}/>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Debes iniciar sesion</h1>
        <Login />
      </div>
    );
  }
}

export default App;
