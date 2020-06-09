-- Up
CREATE TABLE Game (
  id TEXT PRIMARY KEY NOT NULL,
  xIsNext BOOLEAN DEFAULT true,
  winner STRING DEFAULT null,
  current TEXT DEFAULT null,
  FOREIGN KEY (current) REFERENCES Board(id)
);

CREATE TABLE Board (
  id TEXT PRIMARY KEY,
  cell0 STRING DEFAULT null,
  cell1 STRING DEFAULT null,
  cell2 STRING DEFAULT null,
  cell3 STRING DEFAULT null,
  cell4 STRING DEFAULT null,
  cell5 STRING DEFAULT null,
  cell6 STRING DEFAULT null,
  cell7 STRING DEFAULT null,
  cell8 STRING DEFAULT null,
  gameID TEXT,
  FOREIGN KEY (gameID) REFERENCES Game(id) 
);

-- Down
DROP TABLE Game;
DROP TABLE Board;