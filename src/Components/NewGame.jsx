import { useState } from "react";
import { db } from "../service/firebase";
import { randomKeyGeneration } from "../utilities/utilities";

function Home({ history }) {
  const [playerOne, setPlayerOne] = useState("");

  const handleLobbyEnter = () => {
    if (!playerOne) return alert("Please enter player name");
    const key = randomKeyGeneration();

    db.collection("rooms").add({
      key,
      player1: {
        playerId: randomKeyGeneration(16, -8),
        name: playerOne,
        symbol: "X",
        moves: [],
        score: 0,
      },
      board: Array(9).fill(null),
      status: false,
      currentSymbol: "X",
    });

    history.replace(`/lobby/${key}`);
  };

  return (
    <div className="home">
      <input
        type="text"
        onChange={(event) => setPlayerOne(event.target.value)}
        value={playerOne}
        placeholder="Player name"
      />
      <div className="btn">
        <button onClick={handleLobbyEnter}>Enter Lobby</button>
      </div>
    </div>
  );
}

export default Home;
