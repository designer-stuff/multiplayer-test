import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import StartGame from "./Components/StartGame";
import NewGame from "./Components/NewGame";
import JoinGame from "./Components/JoinGame";
import Lobby from "./Components/Lobby";
import { db } from "./service/firebase";
import "./App.css";

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(snapshot.docs.map((doc) => ({ id: doc.id, room: doc.data() })))
    );
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          path="/lobby/:key"
          render={(props) => <Lobby rooms={rooms} {...props} />}
          exact
        />
        <Route
          path="/start-game/:key"
          render={(props) => <StartGame rooms={rooms} {...props} />}
          exact
        />
        <Route
          path="/join-game/:key"
          render={(props) => <JoinGame rooms={rooms} {...props} />}
          exact
        />
        <Route
          path="/new-game"
          render={(props) => <NewGame rooms={rooms} {...props} />}
          exact
        />
        <Redirect from="/" to="/new-game" />
      </Switch>
    </div>
  );
}

export default App;
