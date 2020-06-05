-- Up
CREATE TABLE Game (
    id TEXT PRIMARY KEY NOT NULL,
    play TEXT
);

INSERT INTO Game (id, play) values ('blabla', ' , , , , , , , , ');
INSERT INTO Game (id, play) values ('blablabla', 'X,O,X, , , , , , ');

-- Down
DROP TABLE Game;