import React, { useEffect, useState } from "react";
import { db } from "../service/firebase";
import { getCurrentPlayer, getRoomData } from "../utilities/utilities";

function Game({ match, rooms }) {
  const [room, setRoom] = useState("");
  const [roomId, setRoomId] = useState("");
  const [gameBoard, setGameBoard] = useState([]);
  const [currentSymbol, setCurrentSymbol] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(null);
  const key = match.params.key;
  const boardInputs = [...Array(9).keys()];
  const playerMoves = {
    player1: { moves: [] },
    player2: { moves: [] },
  };

  useEffect(() => {
    const currentRoomId = getRoomData(rooms, key);
    const currentRoom = getRoomData(rooms, key, "room");
    const currentBoard = getRoomData(rooms, key, "board");
    const currentSymbol = getRoomData(rooms, key, "symbol");

    setRoomId(currentRoomId);
    setRoom(currentRoom);
    setGameBoard(currentBoard);
    setCurrentSymbol(currentSymbol);
  }, [rooms, key]);

  // const { player1, player2, status, board } = room;

  const handleDisabledBtn = (boardPos) => {
    const index = gameBoard.indexOf(boardPos);

    setBtnDisabled(index === -1);
  };

  const handlePlayerTurn = (event) => {
    const boardPos = Number.parseInt(event.target.dataset.index);
    const boardValue = event.target.innerHTML;
    const newBoard = [...gameBoard];
    newBoard[boardPos] = boardValue;
    setGameBoard(newBoard);

    const newCurrentPlayer = getCurrentPlayer(room, currentSymbol);

    playerMoves[newCurrentPlayer].moves.push(boardPos);

    db.collection("rooms")
      .doc(roomId)
      .set(
        {
          currentSymbol: currentSymbol === "X" ? "O" : "X",
          board: newBoard,
          [newCurrentPlayer]: {
            moves: playerMoves[newCurrentPlayer].moves,
          },
        },
        { merge: true }
      );

    setBtnDisabled(boardPos);
  };

  return (
    <>
      {room && (
        <>
          <div className="turn">{`Current Player : ${currentSymbol}`}</div>
          <div className="moves">{JSON.stringify(room?.board)}</div>
          <div className="players">
            <div className="player-card player1">
              <div className="player-content">
                <span className="name">{`${room?.player1?.name}(${room?.player1?.symbol})`}</span>
                <span className="score">{`${room?.player1?.score}`}</span>
              </div>
            </div>
            <div className="player-card player1">
              <div className="player-content">
                <span className="name">{`${room?.player2?.name}(${room?.player2?.symbol})`}</span>
                <span className="score">{`${room?.player2?.score}`}</span>
              </div>
            </div>
          </div>
          <div className="btn-group">
            {boardInputs.map((input) => (
              <button
                key={input}
                className="btn btn1"
                onClick={(event) => handlePlayerTurn(event)}
                data-index={input}
                disabled={gameBoard.indexOf(input) === -1}
              >
                {input + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Game;
