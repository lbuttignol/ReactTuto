-- Up
CREATE TABLE Game (
  id TEXT PRIMARY KEY NOT NULL,
  xIsNext BOOLEAN,
  winner STRING,
  current TEXT,
  FOREIGN KEY (current) REFERENCES Board(id)
);

CREATE TABLE Board (
  id TEXT PRIMARY KEY,
  cell0 STRING,
  cell1 STRING,
  cell2 STRING,
  cell3 STRING,
  cell4 STRING,
  cell5 STRING,
  cell6 STRING,
  cell7 STRING,
  cell8 STRING,
  gameID TEXT,
  FOREIGN KEY (gameID) REFERENCES Game(id) 
);

-- Down
DROP TABLE Game;
DROP TABLE Board;