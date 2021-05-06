export const randomKeyGeneration = (radix = 8, length = -5) =>
  Math.random().toString(radix).slice(length);

export const getRoomData = (rooms, roomKey, dataReq = "id") => {
  for (let { id, room } of rooms)
    if (room.key === roomKey)
      if (dataReq === "room") return room;
      else if (dataReq === "board") return room.board;
      else if (dataReq === "symbol") return room.currentSymbol;
      else return id;
};

export const getCurrentPlayer = (room, symbol) => {
  const roomObjKeys = Object.keys(room);

  if (room.player1.symbol === symbol)
    return roomObjKeys[roomObjKeys.indexOf("player1")];

  return roomObjKeys[roomObjKeys.indexOf("player2")];
};
