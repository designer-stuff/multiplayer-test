import { useEffect, useState } from "react";
import { getRoomData } from "../utilities/utilities";

function Lobby({ match, history, rooms }) {
  const [url, setUrl] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [currentRoom, setCurrentRoom] = useState({});
  const key = match.params.key;

  useEffect(() => {
    setWaiting(true);
    const host = window.location.host;
    setUrl(`${host}/join-game/${key}`);

    const room = { ...getRoomData(rooms, key, "room") };
    setCurrentRoom(room);
  }, [key, rooms]);

  setInterval(() => {
    if (currentRoom.player2) {
      setWaiting(false);
      clearInterval();
    }
  }, 1000);

  const handleGameStart = () => {
    history.replace(`/start-game/${key}`);
  };

  const { player1, player2 } = currentRoom;

  return (
    <div>
      {waiting && <h1>Waiting for other players to join...</h1>}
      <p>
        {`URL: ${url}`}
        <br />
        <span>Copy the above URL and share it with your friend</span>
      </p>

      <ul>
        <li key={player1?.playerId}>{player1?.playerId}</li>
        {player2 && <li key={player2?.playerId}>{player2?.playerId}</li>}
      </ul>
      <button onClick={handleGameStart} disabled={waiting}>
        Start Game
      </button>
    </div>
  );
}

export default Lobby;
