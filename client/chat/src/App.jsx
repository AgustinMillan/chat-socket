import "./App.css";
import Login from "./components/login";
import Logout from "./components/logout";
import Chat from "./components/chat";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user,isLoading, isAuthenticated } = useAuth0();

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
        <Chat user={user}/>
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
