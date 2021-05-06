import React, { useState } from "react";
import { db } from "../service/firebase";
import { getRoomData, randomKeyGeneration } from "../utilities/utilities";

function JoinGame({ match, history, rooms }) {
  const [playerTwo, setPlayerTwo] = useState("");
  const key = match.params.key;

  const handleJoin = () => {
    let currentRoomId = "";
    if (!playerTwo) return alert("Please enter player name first");

    const player2 = {
      player2: {
        playerId: randomKeyGeneration(16, -8),
        name: playerTwo,
        symbol: "O",
        moves: [],
        score: 0,
      },
    };

    currentRoomId = getRoomData(rooms, key);

    db.collection("rooms").doc(currentRoomId).set(player2, { merge: true });

    history.replace(`/start-game/${key}`);
  };

  return (
    <div>
      <input
        type="text"
        onChange={(event) => setPlayerTwo(event.target.value)}
        value={playerTwo}
        placeholder="Enter player name"
      />
      <button className="btn" onClick={handleJoin}>
        Join Game
      </button>
    </div>
  );
}

export default JoinGame;
